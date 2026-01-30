# Müşteri Talep (Ticket) Sistemi

Bu proje React kullanılarak geliştirilmiş bir Müşteri Talep (Ticket) sistemidir. Kullanıcılar talep oluşturabilir ve Adminler bu talepleri yönetebilir.

## Kurulum ve Çalıştırma

Projeyi bilgisayarınızda çalıştırmak için sırasıyla şu adımları yapmanız yeterli:

1.  Önce projenin olduğu klasöre terminalden gidin:
    ```bash
    cd TeyasCaseStudy
    ```

2.  Gerekli paketleri indirin:
    ```bash
    npm install
    ```

3.  Projeyi çalıştırın:
    ```bash
    npm run dev
    ```

4.  Tarayıcınızda `http://localhost:3000` (veya terminalde çıkan adres) linkine gidin.

## Giriş Bilgileri

Sistemi denemek için aşağıdaki hesapları kullanabilirsiniz.

**Normal Kullanıcı Girişi:**
*   **Kullanıcı Adı:** user
*   **Şifre:** user123
*   *(Rol olarak "User" seçmelisiniz)*

**Yönetici (Admin) Girişi:**
*   **Kullanıcı Adı:** admin
*   **Şifre:** admin123
*   *(Rol olarak "Admin" seçmelisiniz)*

## Özellikler

*   Kullanıcı ve Yönetici olmak üzere iki farklı rol var.
*   Türkçe ve İngilizce dil seçeneği mevcut.
*   Talepler filtrelenebilir (Açık, Kapalı, vb.).
*   Taleplere yorum/cevap yazılabilir.

## Yapılanlar

Projeyi geliştirirken şunları kullandım:
*   **React:** Sayfaların yapısı için.
*   **Redux Toolkit:** Verileri (state) yönetmek için.
*   **Tailwind CSS:** Tasarımı hızlıca yapmak için.
*   **React Router:** Sayfalar arası geçiş için.

## Proje Teknoloji Özellikleri

*   Components yapısına dikkat edildi. Bu sayede kod kirliliği önlendi.
*   Clean Architecture bir yapı kuruldu.
*   TypeScript ve Tailwind kullanıldı.
*   Derleme ve çalıştırma için Vite kullanıldı.
*   Github Pages ile gerçek test için proje public yayınlandı.
*   İkon seti olarak Google'ın Material Symbols (Outlined) kütüphanesini kullanıldı.
*   **Link:** https://enescanakyuz.github.io/TeyasCaseStudy