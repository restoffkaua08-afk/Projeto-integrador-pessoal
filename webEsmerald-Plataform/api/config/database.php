<?php
function db() {
    $conn = @new mysqli("localhost", "root", "", "esmerald_db");
    if ($conn->connect_error) return null;
    $conn->set_charset("utf8mb4");
    return $conn;
}

function table_exists($conn, $table) {
    if (!$conn) return false;
    $safe = $conn->real_escape_string($table);
    $res = $conn->query("SHOW TABLES LIKE '$safe'");
    return $res && $res->num_rows > 0;
}
?>
