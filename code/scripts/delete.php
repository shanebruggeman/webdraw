<?php
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';
	
	$id = $_GET['id'];

	if($id == '35'){
		echo "invalid";
		return;
	}

	$update = $db->prepare("update user set profile_pic_id='35' where profile_pic_id = :id");
	$update->bindValue(':id', $id, PDO::PARAM_STR);
	$update->execute();
	unlink('pictures/picture'.$id.'.png');
	

	$delete = $db->prepare('delete from picture where id = :id');
	$delete->bindValue(':id', $id, PDO::PARAM_STR);
	$delete->execute();

	$rowCount = $delete->rowCount();

	echo $rowCount;
?>