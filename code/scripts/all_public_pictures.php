<?php 
	header("Access-Control-Allow-Origin: *");

	include 'setdb.php';

	$profileQuery = $db->prepare('select picture.id, picture.name from user join picture on user.id = picture.owner_id where picture.public = true and picture.id != 35');

	$queryResults = array();

	if ($profileQuery->execute()) {
	    while ($row = $profileQuery->fetch(PDO::FETCH_ASSOC)) {
	    	$name = trim($row["name"]);

	    	if(!is_array($queryResults[$name])) {
		    	$queryResults[$row["name"]] = array();
	    	}

	    	array_push($queryResults[$row["name"]], $row["id"]);
	    }
	}

	$images = array();

	foreach ($queryResults as $filename => $idArray) {
		$images[$filename] = array();

		for($i = 0; $i < count($idArray); $i++) {
			$currentId = $queryResults[$filename][$i];

			$images[$currentId] = array();
			$images[$currentId]["name"] = $filename;

			$path = 'pictures/picture' . $currentId . '.png';
	
			// Read path path, convert to base64 encoding
			$imageData = base64_encode(file_get_contents($path));

			// Format the path SRC:  data:{mime};base64,{data};
			$src = 'data: '.mime_content_type($path).';base64,'.$imageData;

			// Echo out a sample path
			$imageHTML = "<img src=\"$src\" alt=\"\" />";
			
			$images[$currentId]["image"] = $imageHTML;
		}
	}

	echo json_encode($images);
 ?>