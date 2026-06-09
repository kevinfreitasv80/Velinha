import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // Container principal (opcional, adicione centralização se necessário)
  },
  body: {
    borderWidth: 5,
    borderColor: '#000000',
    width: 96,          // Equivalente aproximado a 6em
    height: 192,        // Equivalente aproximado a 12em
    borderRadius: 12,   // rounded-xl
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  eyeLeft: {
    borderWidth: 5,
    borderColor: '#000000',
    width: 72,          // Equivalente aproximado a 4.5em
    height: 72,
    borderRadius: 9999, // rounded-full
    position: 'absolute',
    left: -24,          // -left-[1.5em]
    top: 16,            // top-[1em]
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  eyeRight: {
    borderWidth: 5,
    borderColor: '#000000',
    width: 72,
    height: 72,
    borderRadius: 9999,
    position: 'absolute',
    right: -24,         // -right-[1.5em]
    top: 16,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  blinkLid: {
    width: '100%',
    backgroundColor: '#111827', // bg-gray-900
    position: 'absolute',
    zIndex: 10,
  },
  pupilContainer: {
    width: 36,          // Equivalente aproximado a 2.3em
    height: 36,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -18 }, { translateY: -18 }], // Centraliza baseado em metade da largura/altura
    borderRadius: 9999,
    backgroundColor: '#67e8f9', // bg-cyan-300
  },
  sparkleLarge: {
    width: 10,          // Equivalente aproximado a .6em
    height: 10,
    borderRadius: 9999,
    backgroundColor: '#ffffff',
    position: 'absolute',
  },
  sparkleSmall: {
    width: 5,           // Equivalente aproximado a .3em
    height: 5,
    borderRadius: 9999,
    backgroundColor: '#ffffff',
    position: 'absolute',
  },
  mouthSurprised: {
    position: 'absolute',
    bottom: 20,         // bottom-[1.2em]
    left: '50%',
    transform: [{ translateX: -16 }], // Metade da largura (32 / 2)
    borderRadius: 9999,
    borderWidth: 4,
    borderColor: '#000000',
    width: 32,
    height: 32,
    backgroundColor: '#111111',
  },
  mouthNormal: {
    backgroundColor: '#000000',
    width: 48,          // Equivalente aproximado a 3em
    height: 4,          // h-1
    borderRadius: 9999,
    position: 'absolute',
    bottom: '25%',      // bottom-1/4
    left: '50%',
    transform: [{ translateX: -24 }], // Metade da largura (48 / 2)
  },
});