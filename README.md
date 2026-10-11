# Express-Clean-Architecture

## Struktur Aplikasi & Modul
```text
src/
├── infrastructure/
│   ├── persistance // semua akses ke database
│   ├── identity // orkestrator untuk authn & authz program
│   ├── services // orkestrator external program, eg: file-upload
│   ├── config // constant configurasi aplikasi
│   └── middlewares // middlewares
│
├── modules/
│   ├── common/
│   │   ├── helpers // fungsi pembantu
│   │   ├── interfaces // kontrak untuk service yang di infra
│   │   ├── types // kontrak data shared
│   │   └── constants // konstanta global
│   │   
│   └── student/
│       ├── student.contract.ts // kontrak HTTP
│       ├── student.controller.ts // HTTP
│       ├── student.interfaces.ts // kontrak service
│       ├── student.routes.ts // rute defenition
│       └── student.service.ts // orkestrator program  
│
└── server.ts
```

## Dependency Lifetime
- Scoped:
    Ketika kita butuh instance baru untuk tiap HTTP request karena ia memiliki attribute berbeda (tanya Althaf detailnya)
    ```ts
    const something = (() => ({
        const service = new Service();
    }))

    // dan ulangi untuk aksi lain
    ```

- Singleton
    Ketika kita butuh 1 instance sama yang shared dengan instance lain selama aplikasi hidup, 
    ```ts
    const db = new Database();
    const service = new Service(db);
    ```

## Route Name Convention

## Class, Method, Types, Interfaces & Variables Naming Convention
- Class:
    1. Nama Harus berupa pascal case
    2. Harus menambahkan controller/service setelah nama, eg: AuthController/StudentService
    3. Harus diawali export. eg: export class...
    4. Class service harus punya private constructor untuk menyimpan referensi ke instance database
- Method:
    1. Nama harus merepresentasikan aksi, eg: login, deleteById, getAll
    2. Nama tidak perlu menambahkan kata entitas yang terkait, cukup aksi saja seperti loginStudent (salah), login (benar)
    3. Menggunakan camelCase
    4. Jika return/input bukan void maka harus punya tipe return/input
    5. Tambahkan keyword async di awal jika ia asinkronus (biasanya cuman di service)
    6. Boleh diawali keyword public atau tidak
- Interfaces:
    1. Nama harus mencerminkan service yang akan dibuat, eg: IStudentService
    2. Berisi semua kontrak method serta tipe data return/inputnya
    3. Awali nama dengan prefix I (interface), eg IStudentService
- Types:
    1. Nama harus mencerminkan tipe data yang akan dibuat, eg: TProfileDetailsResponse
    2. Awali nama dengan prefix T (Types), eg TProfileDetailsResponse
    3. Umumnya kita gunakan untuk membuat API contract yaitu T{Aksi}{Entitas}Request (untuk data masuk) atau Response (data keluar)
    4. Bisa digunakan untuk custom tipe data internal, eg:
    TJWTClaims, TCookiePayload
- Variables
    1. Harus merepresentasikan apa yang disimpan, eg: const name, let tempData
    2. Hanya boleh gunakan keyword const dan let
    3. Jika ia constant maka buat dengan SCREAMING_SNAKE_CASE
    4. Jika ia sepenuhnya immutable (ga bisa diubah) maka tulis dengan const x = {...} as const

## Libraries
```zsh
bun add helmet.js
bun add cors
```