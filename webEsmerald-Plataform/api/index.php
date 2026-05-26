<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

require_once __DIR__ . "/config/database.php";

$conn = db();

function send_json($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

function get_weapons_from_db($conn) {
    if (!$conn || !table_exists($conn, "armas")) return [];

    $sql = "
        SELECT
            a.id_arma AS id,
            a.nome AS name,
            COALESCE(c.nome_categoria, 'Sem categoria') AS category,
            COALESCE(a.status_meta, 'Estável') AS status,
            a.dano_base AS baseDmg,
            a.cadencia_tiro AS fireRate,
            a.mobilidade_base AS baseMob,
            a.precisao_base AS baseAcc,
            a.controle_recuo AS recoil,
            a.taxa_uso AS `usage`,
            a.taxa_vitoria AS winRate,
            a.imagem_url AS image
        FROM armas a
        LEFT JOIN categorias_armas c ON c.id_categoria = a.id_categoria
        ORDER BY a.id_arma ASC
    ";

    $res = $conn->query($sql);
    if (!$res) return [];

    $items = [];
    while ($row = $res->fetch_assoc()) {
        $items[] = [
            "id" => intval($row["id"]),
            "name" => $row["name"],
            "category" => $row["category"],
            "status" => $row["status"],
            "baseDmg" => intval($row["baseDmg"]),
            "fireRate" => intval($row["fireRate"]),
            "baseMob" => intval($row["baseMob"]),
            "baseAcc" => intval($row["baseAcc"]),
            "recoil" => intval($row["recoil"]),
            "usage" => floatval($row["usage"]),
            "winRate" => floatval($row["winRate"]),
            "image" => $row["image"]
        ];
    }

    return $items;
}

send_json([
    "api" => "online",
    "database" => ["connected" => $conn !== null, "name" => "esmerald_db"],
    "weapons" => get_weapons_from_db($conn)
]);
?>
