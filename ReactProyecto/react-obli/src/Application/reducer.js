import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/usuarioSlice';
import personasUsuarioSlice from './slices/personasUsuarioSlice';
import personasCensadasSlice from './slices/personasCensadasSlice';
import departamentosSlice  from './slices/departamentosSlice'
import ciudadesSlice from './slices/ciudadesSlice';
import ocupacionesSlice from './slices/ocupacionesSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    perUsu: personasUsuarioSlice,
    perCen: personasCensadasSlice,
    depa: departamentosSlice,
    ciud: ciudadesSlice,
    ocu: ocupacionesSlice
  },
});