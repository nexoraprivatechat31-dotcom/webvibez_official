Add-Type -AssemblyName System.Drawing

$srcPath = "e:\WebVibez Software Devloper\webvibez_WebSite\src\Images\square-image.jpg"
$origBitmap = [System.Drawing.Bitmap]::FromFile($srcPath)

function Create-RoundedIcon([System.Drawing.Bitmap]$source, [int]$size, [float]$cornerRatio = 0.22) {
    $dest = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $radius = $size * $cornerRatio
    $diameter = $radius * 2.0
    $rect = New-Object System.Drawing.RectangleF(0, 0, $size, $size)

    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc($rect.X, $rect.Y, $diameter, $diameter, 180, 90)
    $path.AddArc($rect.Right - $diameter, $rect.Y, $diameter, $diameter, 270, 90)
    $path.AddArc($rect.Right - $diameter, $rect.Bottom - $diameter, $diameter, $diameter, 0, 90)
    $path.AddArc($rect.X, $rect.Bottom - $diameter, $diameter, $diameter, 90, 90)
    $path.CloseFigure()

    $g.SetClip($path)
    $g.DrawImage($source, 0, 0, $size, $size)
    $g.ResetClip()

    # Subtle 1px inner border for crisp contrast on light & dark tabs
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(40, 255, 255, 255), 1.0)
    $g.DrawPath($pen, $path)

    $g.Dispose()
    $path.Dispose()
    $pen.Dispose()
    return $dest
}

# 1. Generate 512x512
$icon512 = Create-RoundedIcon $origBitmap 512 0.22
$icon512.Save("e:\WebVibez Software Devloper\webvibez_WebSite\public\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$icon512.Save("e:\WebVibez Software Devloper\webvibez_WebSite\public\images\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$icon512.Save("e:\WebVibez Software Devloper\webvibez_WebSite\src\Images\favicon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$icon512.Save("e:\WebVibez Software Devloper\webvibez_WebSite\src\app\icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$icon512.Save("e:\WebVibez Software Devloper\webvibez_WebSite\src\app\apple-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 2. Generate 192x192 and 32x32 for icon formats
$icon32 = Create-RoundedIcon $origBitmap 32 0.22
$icon64 = Create-RoundedIcon $origBitmap 64 0.22

# Save as ICO (using Icon handle)
$hIcon = $icon64.GetHicon()
$iconObj = [System.Drawing.Icon]::FromHandle($hIcon)
$fileStream = New-Object System.IO.FileStream("e:\WebVibez Software Devloper\webvibez_WebSite\public\favicon.ico", [System.IO.FileMode]::Create)
$iconObj.Save($fileStream)
$fileStream.Close()
$iconObj.Dispose()

# 3. Generate SVG version with rounded clip
$bytes = [System.IO.File]::ReadAllBytes($srcPath)
$base64 = [Convert]::ToBase64String($bytes)
$svgContent = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <clipPath id="rounded-corners">
      <rect x="0" y="0" width="512" height="512" rx="112" ry="112" />
    </clipPath>
  </defs>
  <image width="512" height="512" href="data:image/jpeg;base64,$base64" clip-path="url(#rounded-corners)" />
</svg>
"@
[System.IO.File]::WriteAllText("e:\WebVibez Software Devloper\webvibez_WebSite\public\favicon.svg", $svgContent)
[System.IO.File]::WriteAllText("e:\WebVibez Software Devloper\webvibez_WebSite\public\icon.svg", $svgContent)
[System.IO.File]::WriteAllText("e:\WebVibez Software Devloper\webvibez_WebSite\src\app\icon.svg", $svgContent)

$origBitmap.Dispose()
$icon512.Dispose()
$icon32.Dispose()
$icon64.Dispose()
Write-Host "Favicon generated successfully!"
