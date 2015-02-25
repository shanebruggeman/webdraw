<?php 
	header("Access-Control-Allow-Origin: *");

	include 'setdb.php';

	$userid = $_GET['userid'];

	$sql = 'select picture.id, picture.name from user '.
				' join picture on user.id = picture.owner_id '.
				' where user.id in('.
					' select user.id'.
					' from('.
						' (select requester_id as id '.
							'  from friend_request '.
							'  where requestee_id = :userid and acceptance = true)'.
						' union '.
						' (select requestee_id '.
							'  from friend_request '.
							'  where requester_id = :userid and acceptance = true)'.
					 		'  order by id asc) as friends '.
						' join user on user.id = friends.id);';

	$profileQuery = $db->prepare($sql);
	$profileQuery->bindValue(':userid', $userid, PDO::PARAM_STR);

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
		// $images[$filename] = array();

		for($i = 0; $i < count($idArray); $i++) {
			$currentId = $queryResults[$filename][$i];
			$path = 'pictures/picture' . $currentId . '.png';

			$images[$currentId] = array();
			$images[$currentId]["name"] = $filename;

			// Read path path, convert to base64 encoding
			$imageData = base64_encode(file_get_contents($path));

			// Format the path SRC:  data:{mime};base64,{data};
			$src = 'data: '.mime_content_type($path).';base64,'.$imageData;

			// Echo out a sample path
			$imageHTML = '<img src="' . $src . '" alt="' . $currentId . '" />';
			$images[$currentId]["image"] = $imageHTML;
		}
	}

	echo json_encode($images);
 ?>