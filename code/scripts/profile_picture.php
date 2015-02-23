<?php
	// necessary for allowing cross-origin requests
	header("Access-Control-Allow-Origin: *");
	return;

	include 'setdb.php';

	$username = $_POST['username'];

	$profileQuery = $db->prepare('select picture.id from user join picture on user.profile_pic_id = picture.id where user.username = :username');
	$profileQuery->bindValue(':username', $username, PDO::PARAM_STR);
	$profileQuery->execute();

	$count = $profileQuery->rowCount();

	$row = $query->fetch(PDO::FETCH_ASSOC));
	
	$path = 'picture' . $row['id'];

	// Read path path, convert to base64 encoding
	$imageData = base64_encode(file_get_contents($path));

	// Format the path SRC:  data:{mime};base64,{data};
	$src = 'data: '.mime_content_type($path).';base64,'.$imageData;

	// Echo out a sample path
	echo "<img src=\"$src\" alt=\"\" />";
 ?>