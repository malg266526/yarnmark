import os
from pathlib import Path
from PIL import Image
import pillow_avif  # Rejestruje obsługę formatu AVIF w Pillow

def optimize_images(input_folder):
    # Tworzenie folderu wyjściowego
    output_folder = os.path.join(input_folder, "optimized")
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Obsługiwane rozszerzenia
    extensions = [".jpg", ".jpeg", ".JPG", ".JPEG", ".png"]
    
    files = [f for f in os.listdir(input_folder) if Path(f).suffix in extensions]
    
    print(f"Znaleziono {len(files)} plików do optymalizacji.")

    for file_name in files:
        img_path = os.path.join(input_folder, file_name)
        base_name = Path(file_name).stem
        
        try:
            with Image.open(img_path) as img:
                # 1. Konwersja na WebP
                webp_path = os.path.join(output_folder, f"{base_name}.webp")
                img.save(webp_path, "WEBP", quality=80)
                
                # 2. Konwersja na AVIF
                avif_path = os.path.join(output_folder, f"{base_name}.avif")
                img.save(avif_path, "AVIF", quality=60) # AVIF przy 60 ma jakość podobną do JPG 80
                
                print(f"Zoptymalizowano: {file_name} -> WebP i AVIF")
        except Exception as e:
            print(f"Błąd przy pliku {file_name}: {e}")

    print(f"\nGotowe! Zoptymalizowane pliki znajdziesz w: {output_folder}")

# Uruchomienie (wpisz ścieżkę do swojego folderu)
if __name__ == "__main__":
    path = input("Podaj ścieżkę do folderu ze zdjęciami: ")
    optimize_images(path)
