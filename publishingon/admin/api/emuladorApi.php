<?php
$json = array(
    'nombre' => $_POST['nombre'],
    'campania' => $_POST['campania'],
    'cliente' => $_POST['cliente'],
    'proveedores' => $_POST['proveedores'],
    'impresiones' => $_POST['impresiones'],
    'clics' => $_POST['clics'],
    'inicioF' => $_POST['inicioF'],
    'inicioH' => $_POST['inicioH'],
    'finF' => $_POST['finF'],
    'finH' => $_POST['finH'],
    'url' => $_POST['url'],
    'titulo' => $_POST['titulo'],
    'mensaje' => $_POST['mensaje'],
    'txtc' => $_POST['txtc'],
    'bgc' => $_POST['bgc'],
    'id' => $_POST['id'],
    'width' => $_POST['width'],
    'height' => $_POST['height'],
);

$jsonencoded = json_encode($json,JSON_UNESCAPED_UNICODE);
$fh = fopen($_POST['id'].".json", 'w');
fwrite($fh, $jsonencoded);
fclose($fh);

if (file_exists($_POST['id'].".json")) {
    $res = 1;
} else {
    $res = 0;
}

print_r(json_encode($res));
?>