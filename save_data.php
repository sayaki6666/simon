<?ptp
// the $_PST[] array will contain the passed in filename and data 
// the derectory "data" is writable by the server (chmod 777)
$filename = "data/".$_POST['filename'];
$data = $_POST['filedata'];
// write the file to disk
file_put_contents($filename, $data);
?>