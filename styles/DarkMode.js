import { StyleSheet } from 'react-native';

export const darkTheme = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1c1c1e', padding: 10 },
  message: { color: '#ffffff', marginBottom: 10 },
  sender: { fontWeight: 'bold', color: '#0a84ff' },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#3a3a3c', backgroundColor: '#2c2c2e', color: '#fff', padding: 10, borderRadius: 5 },
});