import { View } from 'react-native';
import { styles } from './styles'; // Importando os estilos isolados

interface CharacterProps {
  isBlink: boolean;
  surprised: boolean;
}

export const Character: React.FC<CharacterProps> = ({ isBlink, surprised }) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        
        {/* Olho esquerdo */}
        <View style={styles.eyeLeft}>
          <View
            style={[styles.blinkLid, { height: isBlink ? 70 : 0 }]}
          />
          <View style={styles.pupilContainer}>
            <View style={[styles.sparkleLarge, { right: 4, top: 8 }]} />
            <View style={[styles.sparkleSmall, { left: 4, bottom: 8 }]} />
          </View>
        </View>

        {/* Olho direito */}
        <View style={styles.eyeRight}>
          <View
            style={[styles.blinkLid, { height: isBlink ? 70 : 0 }]}
          />
          <View style={styles.pupilContainer}>
            <View style={[styles.sparkleLarge, { left: 4, top: 8 }]} />
            <View style={[styles.sparkleSmall, { right: 4, bottom: 8 }]} />
          </View>
        </View>

        {/* Boca — normal: linha horizontal | surpresa: círculo aberto */}
        {surprised ? (
          <View style={styles.mouthSurprised} />
        ) : (
          <View style={styles.mouthNormal} />
        )}

      </View>
    </View>
  );
};