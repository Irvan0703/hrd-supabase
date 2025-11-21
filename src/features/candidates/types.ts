// src/features/candidates/types.ts

/**
 * Interface yang merepresentasikan objek data Kandidat 
 * sesuai dengan kolom yang terlihat pada gambar tabel.
 */
export interface Candidate {
    /** ID unik dari kandidat (asumsi) */
    id: string;
    /** Nama Lengkap kandidat */
    namaLengkap: string;
    /** Alamat Email kandidat */
    emailAddress: string;
    /** Nomor Telepon kandidat */
    phoneNumbers: string;
    /** Tanggal Lahir kandidat */
    dateOfBirth: string;
    /** Domisili/Kota tempat tinggal kandidat */
    domicile: string;
    /** Jenis Kelamin kandidat */
    gender: 'Male' | 'Female' | 'Other';
    /** URL profil LinkedIn kandidat */
    linkLinkedin: string;
    // Anda bisa menambahkan properti lain di sini,
    // seperti status aplikasi, tanggal apply, dll.
}