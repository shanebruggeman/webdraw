<?php 
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';

	$name = $_GET['name'];

	$query = $db->prepare('select picture.id, picture.name from picture where picture.public = true and picture.name like :querystring');
	$query->bindValue(':querystring', '%' . $name . '%', PDO::PARAM_STR);
	$query->execute();

	$results = array();

	if ($query->execute()) {
	    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
	    	$picture_id = $row["id"];
	    	$picture_name = $row["name"];

	    	$results[$picture_id] = array();
	    	$results[$picture_id]["name"] = $picture_name;

	    	$path = 'pictures/picture' . $picture_id . '.png';
	
			// Read path path, convert to base64 encoding
			$imageData = base64_encode(file_get_contents($path));

			// Format the path SRC:  data:{mime};base64,{data};
			$src = 'data: '.mime_content_type($path).';base64,'.$imageData;

			// Echo out a sample path
			$imageHTML = "<img src=\"$src\" alt=\"\" />";
			
			$results[$picture_id]["image"] = $imageHTML;
	    }
	}

	echo json_encode($results);
 ?>