<?php
	header("Access-Control-Allow-Origin: *");
	include 'setdb.php';
	
	$id = $_GET['id'];
	
	//echo "delete";
	unlink('pictures/picture'.$id.'.png');
	
	if(isset($_GET['id'])) {
		//$imgurl = $_GET['imgurl'];
		//echo "delete GET";
	}

	$delete = $db->prepare('delete from picture where id = :id');
	$delete->bindValue(':id', $id, PDO::PARAM_STR);
	$delete->execute();

	$rowCount = $delete->rowCount();

	echo $rowCount;
?>