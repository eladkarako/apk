<?php
  while (ob_get_level() > 0) ob_end_flush();

  date_default_timezone_set("Asia/Jerusalem");

  mb_language("uni");
  mb_internal_encoding('UTF-8');
  setlocale(LC_ALL, 'en_US.UTF-8');

  header('Content-Type: text/plain; charset=UTF-8');
  header('Access-Control-Allow-Origin: *');
  header('X-Content-Type-Options: nosniff');
  header('X-UA-Compatible: IE=edge,chrome=1');

  //    header('Content-Length: 0');
  //  header("HTTP/1.0 204 No Content");

  require_once('fn.php');

  $data = [];
  $path = './resources/';
  foreach (files_in($path) as $file) {
    $data[ $file ] = 'data:' . get_mimetype_for_ext(pathinfo($file, PATHINFO_EXTENSION)) . ';base64,';
    $data[ $file ] = $data[ $file ] . base64_encode(file_get_contents($path . $file));
  }
  $keys = array_keys($data);
  $data = json_encode($data);
  $data = zlib_encode($data, ZLIB_ENCODING_DEFLATE, 9);
  $data = base64_encode($data);


  //data
  @file_put_contents('./generated/libs_to_localstorage.js'
    , str_replace('##CONTENT##', $data, @file_get_contents('./template/libs_to_localstorage.js'))
  );

  //  keys
  @file_put_contents('./generated/index.js'
    , str_replace('["##CONTENT##"]', json_encode($keys), file_get_contents('./template/index.js'))
  );
  flush();
  die(0);
?>
