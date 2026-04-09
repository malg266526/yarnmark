import os
import struct
from pathlib import Path
from PIL import Image
import pillow_avif  # Rejestruje obsługę formatu AVIF w Pillow


def _extract_eps_preview(eps_path: Path) -> Image.Image:
    with eps_path.open("rb") as eps_file:
        header = eps_file.read(30)
        if len(header) < 30:
            raise OSError(f"Plik {eps_path.name} nie ma poprawnego nagłówka EPS.")

        magic, _, _, _, _, preview_start, preview_length, _ = struct.unpack("<IIIIIIIH", header)
        if magic != 0xC6D3D0C5 or preview_length == 0:
            raise OSError(f"Plik {eps_path.name} nie zawiera osadzonego podglądu TIFF.")

        eps_file.seek(preview_start)
        preview = eps_file.read(preview_length)

    endian = "<" if preview[:2] == b"II" else ">"
    _, ifd_offset = struct.unpack(f"{endian}HI", preview[2:8])
    entries_count = struct.unpack(f"{endian}H", preview[ifd_offset:ifd_offset + 2])[0]

    tags = {}
    for index in range(entries_count):
        offset = ifd_offset + 2 + index * 12
        tag, tag_type, count, value = struct.unpack(f"{endian}HHII", preview[offset:offset + 12])
        tags[tag] = (tag_type, count, value)

    width = tags[0x100][2]
    height = tags[0x101][2]
    pixels_offset = tags[0x111][2]
    pixels_length = tags[0x117][2]
    color_map_count = tags[0x140][1]
    color_map_offset = tags[0x140][2]

    raw_pixels = preview[pixels_offset:pixels_offset + pixels_length]
    color_map = struct.unpack(
        f"{endian}{'H' * color_map_count}",
        preview[color_map_offset:color_map_offset + color_map_count * 2]
    )

    red_channel = [value >> 8 for value in color_map[:256]]
    green_channel = [value >> 8 for value in color_map[256:512]]
    blue_channel = [value >> 8 for value in color_map[512:768]]

    image = Image.new("RGBA", (width, height))
    image.putdata(
        [
            (red_channel[color_index], green_channel[color_index], blue_channel[color_index], alpha)
            for color_index, alpha in zip(raw_pixels[::2], raw_pixels[1::2])
        ]
    )
    return image


def _open_image(image_path: Path) -> Image.Image:
    if image_path.suffix.lower() != ".eps":
        return Image.open(image_path)

    try:
        image = Image.open(image_path)
        image.load()
        return image
    except OSError as error:
        if "Ghostscript" not in str(error):
            raise
        return _extract_eps_preview(image_path)

def optimize_images(input_folder):
    # Tworzenie folderu wyjściowego
    output_folder = os.path.join(input_folder, "optimized")
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Obsługiwane rozszerzenia
    extensions = {".jpg", ".jpeg", ".png", ".eps"}

    files = [f for f in os.listdir(input_folder) if Path(f).suffix.lower() in extensions]
    
    print(f"Znaleziono {len(files)} plików do optymalizacji.")

    for file_name in files:
        img_path = os.path.join(input_folder, file_name)
        base_name = Path(file_name).stem
        
        try:
            with _open_image(Path(img_path)) as img:
                optimized_img = img.convert("RGBA") if img.mode in {"P", "RGBA", "LA"} else img.convert("RGB")

                # 1. Konwersja na WebP
                webp_path = os.path.join(output_folder, f"{base_name}.webp")
                optimized_img.save(webp_path, "WEBP", quality=80)
                
                # 2. Konwersja na AVIF
                avif_path = os.path.join(output_folder, f"{base_name}.avif")
                optimized_img.save(avif_path, "AVIF", quality=60) # AVIF przy 60 ma jakość podobną do JPG 80
                
                print(f"Zoptymalizowano: {file_name} -> WebP i AVIF")
        except Exception as e:
            print(f"Błąd przy pliku {file_name}: {e}")

    print(f"\nGotowe! Zoptymalizowane pliki znajdziesz w: {output_folder}")

# Uruchomienie (wpisz ścieżkę do swojego folderu)
if __name__ == "__main__":
    path = input("Podaj ścieżkę do folderu ze zdjęciami: ")
    optimize_images(path)
