export interface MascotaData {
  nombre: string;
  sexo: string;
  raza: string;
  nacimiento: string;
  color: string;
  senasParticulares: string;
  idTipoMascota: number | null;
}

export interface DuenioData {
  nombre: string;
  apellidos: string;
  Email: string;
  Direccion: string;
  Telefono: string;
}

export interface HistorialData {
  vacunas: string;
  Alergias?: string;
  Enfermedades?: string;
  tamano: string;
  pesoActual: number;
  Esterilizacion: boolean;
  condicionesPrevias: string;
  Desparasitacion: string;
}
