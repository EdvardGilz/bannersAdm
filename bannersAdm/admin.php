<!DOCTYPE html>
<html>
<body>

<form action="" method="post" enctype="multipart/form-data">
    <input type="text" name="titulo" placeholder="Titulo"><br>
    <input type="text" name="texto" placeholder="Texto"><br>
    Select image to upload:
    <input type="file" name="fileToUpload" id="fileToUpload"><br>
    <input type="submit" value="Guardar configuracion" name="submit">
</form>

<?php
$directorio = 'data/json';
$scanned_directory = array_diff(scandir($directorio), array('..', '.'));

echo "Tus banner: <br>";
foreach ($scanned_directory as $key => $value) {
    echo trim($value,".json") . "<br>";
}
?>

</body>
</html>




<?php
if(isset($_POST["submit"])) {
    // TEXTO
    $titulo = $_POST["titulo"];
    $texto = $_POST["texto"];

    // ID
    function generateRandomString($length = 10) {
        return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
    }
    $id = generateRandomString();

    // IMAGEN
    $target_dir = "data/img/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
    // Check if image file is a actual image or fake image

    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        // echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }
    // Check file size
    // if ($_FILES["fileToUpload"]["size"] > 500000) {
    //     echo "Sorry, your file is too large.";
    //     $uploadOk = 0;
    // }
    // Allow certain file formats
    if($imageFileType != "JPG" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    // if everything is ok, try to upload file
    } 
    else {
        $imagen = $_FILES["fileToUpload"]["name"];
        if ($titulo != "" && $texto != "" && $imagen != "") {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                // echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
                
                // TODO CORRECTO CREA JSON
                echo $titulo . "<br>";
                echo $texto . "<br>";
                echo $imagen . "<br>";
                echo $id . "<br>";

                $json = array(
                    'titulo' => $titulo,
                    'texto' => $texto,
                    'imagen' => $imagen,
                    'id' => $id
                );

                $jsonencoded = json_encode($json,JSON_UNESCAPED_UNICODE);
                $fh = fopen("data/json/".$id.".json", 'w');
                fwrite($fh, $jsonencoded);
                fclose($fh);

            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
        else {
            echo "Falta información";
        }
    }
}
?>
