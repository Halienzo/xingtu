param(
  [string]$WorkspaceRoot = "E:\xsc",
  [string]$OutDir = "E:\xsc\app\generated\vocabulary\legacy-doc-text"
)

$ErrorActionPreference = "Stop"

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$inputPaths = @(
  (Join-Path $WorkspaceRoot "01-初中单词与短语默写"),
  (Join-Path $WorkspaceRoot "02-人教版初中英语知识点汇总"),
  (Join-Path $WorkspaceRoot "03-初中中考英语语法专项训练"),
  (Join-Path $WorkspaceRoot "小学词汇1166（1-6年级+P35）.doc"),
  (Join-Path $WorkspaceRoot "3-高中3500词汇 - 带音标.docx")
)

$docs = @()
foreach ($p in $inputPaths) {
  if (Test-Path -LiteralPath $p -PathType Container) {
    $docs += Get-ChildItem -LiteralPath $p -Recurse -File -Include *.doc | Where-Object { $_.Extension -ieq ".doc" }
  } elseif (Test-Path -LiteralPath $p -PathType Leaf) {
    $item = Get-Item -LiteralPath $p
    if ($item.Extension -ieq ".doc") {
      $docs += $item
    }
  }
}

$manifest = @()
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

try {
  foreach ($doc in $docs) {
    $hash = (Get-FileHash -LiteralPath $doc.FullName -Algorithm SHA1).Hash.ToLowerInvariant()
    $outPath = Join-Path $OutDir "$hash.txt"
    $status = "converted"
    $errorMessage = $null

    $opened = $null
    try {
      $opened = $word.Documents.Open($doc.FullName, $false, $true)
      $text = $opened.Content.Text
      Set-Content -LiteralPath $outPath -Value $text -Encoding UTF8
    } catch {
      $status = "failed"
      $errorMessage = $_.Exception.Message
    } finally {
      if ($opened -ne $null) {
        $opened.Close($false) | Out-Null
      }
    }

    $manifest += [pscustomobject]@{
      source = $doc.FullName
      hash = $hash
      textPath = $outPath
      status = $status
      error = $errorMessage
    }
  }
} finally {
  $word.Quit()
}

$manifestPath = Join-Path $OutDir "manifest.json"
$manifest | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $manifestPath -Encoding UTF8

Write-Host "Converted legacy .doc files: $($manifest.Count)"
Write-Host "Manifest: $manifestPath"
