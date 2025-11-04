export interface DoctorsType {
    id: number;
    name: string;
    specialty: string;
    hospital: string;
    image: string;
    rate: number;
    availability: string;
    favorite: boolean;
    price: number;
    gender: 'Male' | 'Female';
}

export const DoctorsList: DoctorsType[] = [
    {
        id: 1,
        name: 'Dr. John Doe',
        specialty: 'Cardiologist',
        hospital: 'El-Nasr Hospital',
        image: '/image/doctor-2.jpg',
        rate: 4.3,
        availability: '9:30am - 8:00pm',
        favorite: false,
        price: 350,
        gender: 'Male'
    },
    {
        id: 2,
        name: 'Dr. Jane Smith',
        specialty: 'Orthopedic',
        hospital: 'El-Nasr Hospital',
        image: '/image/doctor-2.jpg',
        rate: 4.3,
        availability: '9:30am - 8:00pm',
        favorite: false,
        price: 350,
        gender: 'Female'
    },
    {
        id: 3,
        name: 'Dr. Emily Johnson',
        specialty: 'Pediatrician',
        hospital: 'El-Nasr Hospital',
        image: '/image/doctor-3.jpg',
        rate: 4.3,
        availability: '9:30am - 8:00pm',
        favorite: false,
        price: 350,
        gender: 'Female'
    },
    {
        id: 4,
        name: 'Dr. Michael Brown',
        specialty: 'Neurologist',
        hospital: 'El-Nasr Hospital',
        image: '/image/doctor-4.jpg',
        rate: 4.3,
        availability: '9:30am - 8:00pm',
        favorite: false,
        price: 350,
        gender: 'Male'
    },
    {
        id: 5,
        name: 'Dr. John Doe',
        specialty: 'Cardiologist',
        hospital: 'El-Nasr Hospital',
        image: '/image/doctor-1.jpg',
        rate: 4.3,
        availability: '9:30am - 8:00pm',
        favorite: false,
        price: 350,
        gender: 'Male'
    },
    {
        id: 6,
        name: 'Dr. Jane Smith',
        specialty: 'Dermatologist',
        hospital: 'El-Nasr Hospital',
        image: '/image/doctor-2.jpg',
        rate: 4.3,
        availability: '9:30am - 8:00pm',
        favorite: false,
        price: 350,
        gender: 'Female'
    },
    {
        id: 7,
        name: 'Dr. Emily Johnson',
        specialty: 'Pediatrician',
        hospital: 'El-Nasr Hospital',
        image: '/image/doctor-3.jpg',
        rate: 4.3,
        availability: '9:30am - 8:00pm',
        favorite: false,
        price: 350,
        gender: 'Female'
    },
    {
        id: 8,
        name: 'Dr. Michael Brown',
        specialty: 'Neurologist',
        hospital: 'El-Nasr Hospital',
        image: '/image/doctor-4.jpg',
        rate: 4.3,
        availability: '9:30am - 8:00pm',
        favorite: false,
        price: 350,
        gender: 'Male'
    }
];


// const API_BASE_URL = 'https://cure-doctor-booking.runasp.net/api';
// const TOKEN =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MTE1Nzg4My01OTIyLTQ3YzQtOWM1My1mYzE1NDlkZTg4NDciLCJ1bmlxdWVfbmFtZSI6IisyMTQ1NjAwMTAwMyIsImZpcnN0TmFtZSI6ImFiZHVsbGFoIiwibGFzdE5hbWUiOiIiLCJhZGRyZXNzIjoiIiwiaW1nVXJsIjoiIiwiYmlydGhEYXRlIjoiMDAwMS0wMS0wMSIsImdlbmRlciI6Ik1hbGUiLCJsb2NhdGlvbiI6IiIsImlzTm90aWZpY2F0aW9uc0VuYWJsZWQiOiJUcnVlIiwiZXhwIjoxNzYyMzQ4OTAzLCJpc3MiOiJodHRwczovL2N1cmUtZG9jdG9yLWJvb2tpbmcucnVuYXNwLm5ldC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MDAwLGh0dHBzOi8vbG9jYWxob3N0OjU1MDAsaHR0cHM6Ly9sb2NhbGhvc3Q6NDIwMCAsaHR0cHM6Ly9jdXJlLWRvY3Rvci1ib29raW5nLnJ1bmFzcC5uZXQvIn0.zE7SaaokojUyqOp1rmVWAPD3ryp3RX8bDZ1hJ9vlPvc';

// // Async Thunks
// export const fetchDoctors = createAsyncThunk(
//     'doctor/fetchDoctors',
//     async (DoctorsType, { rejectWithValue }) => {
//         try {
//             const res = await axios.get(`${API_BASE_URL}api/Customer/Doctors/GetAllDoctors`, {
//                 headers: {
//                     Authorization: `Bearer ${TOKEN}`,
//                     Accept: 'application/json'
//                 },
//                 params: DoctorsType
//             });
//             console.log('Fetched Doctors:', res.data.data);
//             return res.data.data;
//         } catch (error: any) {
//             if (error.response?.status === 401) {
//                 return rejectWithValue('Unauthorized! Check your token.');
//             }
//             return rejectWithValue(error.message || 'Failed to fetch doctors');
//         }
//     }
// );
