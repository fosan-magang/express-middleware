# FOSAN TODO


Kita akan coba membuat sebuah aplikasi simulasi aplikasi todo list.

**Notes**

- Wajib menggunakan port **3000**
- masukkan node_modules pada .gitignore

---

## Level 0
buatlah tabel berikut boleh menggunakan third party client seperti dbeaver / pgAdmin

Buatlah Model `User` dengan field field sebagai berikut:

| Field    | Type   | Description                      |
| -------- | ------ | -------------------------------- |
| id       | Integer| Id primary key                   |
| name     | String | Nama dari User                   |
| password | String | Password User                    |
| email    | String | Email dari User                  |
| foto     | String | nama file foto dari User         |

Buatlah Model  `Todo` dengan field field sebagai berikut:

| Field     | Type    | Description                                                  |
| --------- | ------- | ------------------------------------------------------------ |
| id        | Serial  | Id primary key                                               |
| kegiatan  | String  | Nama Kegiatan                                                |
| status    | Integer | 0 untuk belum terlaksana, 1 jika sudah terlaksana            |
| userId    | Integer | foreign key untuk id user                                    |



## Level 1

Buatlah sebuah routes seperti perintah dibawah ini

**Informasi routes yang perlu dibuat untuk aplikasi ini adalah:**

| Method | Routes                 | Description                                       |
| ------ | ---------------------- | ------------------------------------------------- |
| POST   | /user/register         | Menambahkan user register                         |
| POST   | /user/login            | Masuk ke dalam aplikasi fosan todo                |
| GET    | /user                  | Melihat data profil                               |
| GET    | /todo                  | Menampilkan semua todo list                       |
| POST   | /todo/                 | Input kegiatan baru                               |
| GET    | /edittodo/:id          | Menampilkan todo id tertentu                      |
| PUT    | /todo/:id              | Mengedit data                                     |
| DELETE | /todo/:id              | Menghapus data kegiatan di dalam aplikasi         |

**Route yang dibuat haruslah sama dengan apa yang ditulis disini**

## Level 2

Kalian diminta untuk membuat proses authentication dan authorization! sehingga tidak sembarangan orang bisa masuk ke dalam aplikasi todo


- POST /user/register

  Buatlah route untuk melakukan registrasi `User`, input yang dibutuhkan:

  - email
  - name
  - password, lakukan encryption (**Ingat! database tidak boleh menyimpan plain-password**)
  - Foto, lakukan upload file dengan menggunakan skema form-data, untuk library boleh pakai apapun, letakkan file pada folder /public/foto

  Jika signup berhasil, beri response `Sign Up, Success!`
  
  - GET /user
  
  Buatlah route untuk menampilkan data dari user sesuai token yang dikirim

- POST /user/login

  Buatlah route untuk melakukan pemeriksaan apakah `User` sudah pernah mendaftar sebelumnya. Jika berhasil, berikan response berupa message `Sign In, Success!` dan token yang berisi data `id, name` apabila gagal berikan response gagalnya sesuai dengan permasalahan:
  username tidak terdaftar, password salah dan token tidak valid

## Level 3

Saatnya User melakukan kegiatan maka akan terjadi perubahan, gunakan  **authentication** dalam penggunaan endpoint dibawah ini

- POST /todo

  Buatlah route yang digunakan untuk menyimpan data - data sesuai attributes todo 

- GET /todo

  Buatlah route yang digunakan menampilkan semua data - data todo list dari semua user

- GET /edittodo/:id

  Buatlah route yang digunakan menampilkan data sesuai dengan id

## Level 4

User melakukan pengeditan pada sistem aplikasi ini, gunakan end point ini apabila ada perubahan dalam database! pada endpoint ini gunakan pengecekan **authentication** dalam penggunaan endpoint dibawah ini

- PUT /todo/:id

  Buatlah route yang digunakan untuk mengubah data setelah itu berikan respon berhasil

- DELETE /todo/:id

  Buatlah route yang digunakan untuk menghilangkan data dari dalam database setelah itu berikan respon berhasil



## Level 5 :rocket::rocket::rocket::rocket::alien::alien::alien::alien::alien::alien::alien::alien:

Buatlah sebuah **authorization untuk user terkait**  yang berfungsi untuk bisa mengedit data didalam database. 

gunakan endpoint dibawah ini:

- PUT /todo/:id


  Buatlah route yang digunakan untuk mengedit data , harus user terkait (pemilik kegiatan) saja yang bisa menggunakan endpoint ini, setelah itu berikan respon berhasil.

## Level 6 :rocket:

Lakukan serving pada file yang telah diupload pada folder /public/foto menggunakan express static. 



## :fire::fire::fire::fire::fire::fire::fire::fire::fire::fire::fire::fire::fire::fire::fire::fire::fire::fire::fire::fire::fire::fire:
