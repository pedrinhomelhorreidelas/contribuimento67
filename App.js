// Importa os módulos necessários do React Native e outros componentes
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements'; // Componente de cabeçalho
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Fornece uma área segura para renderização
import db from './localdb'; // Banco de dados local
import PhonicSoundButton from './components/PhonicSoundButton'; // Componente de botão para sons fonéticos

console.log(db["the"].chunks); // Log de exemplo para imprimir chunks da palavra "the"

// Componente principal do aplicativo
export default class App extends React.Component {
  constructor() {
    super();
    // Inicializa o estado do componente
    this.state = {
      text: '',          // Armazena a palavra inserida pelo usuário
      chunks: [],        // Armazena os chunks da palavra consultada no banco de dados
      phonicSounds: [],  // Armazena os sons fonéticos correspondentes à palavra consultada
    };
  }

  // Método para renderizar o componente
  render() {
    return (
      // Utiliza o SafeAreaProvider para garantir a renderização segura
      <SafeAreaProvider>
        <View style={styles.container}>
          {/* Cabeçalho com título e cor de fundo */}
          <Header
            backgroundColor={'#9c8210'}
            centerComponent={{
              text: 'Macaquinho Fofo',
              style: { color: '#fff', fontSize: 20 },
            }}
          />

          {/* Imagem exibida no centro da tela */}
          <Image
            style={styles.imageIcon}
            source={{
              uri: 'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',
            }}
          />

          {/* Campo de entrada de texto para o usuário digitar uma palavra */}
          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({ text: text });
            }}
            value={this.state.text}
          />

          {/* Botão para acionar a busca no banco de dados com base na palavra inserida */}
          <TouchableOpacity
            style={styles.goButton}
            onPress={() => {
              this.setState({ chunks: db[this.state.text].chunks });
              this.setState({ phonicSounds: db[this.state.text].phones });
            }}>
            <Text style={styles.buttonText}>IR</Text>
          </TouchableOpacity>

          {/* Exibe os chunks e os sons fonéticos correspondentes */}
          <View>
            {this.state.chunks.map((item, index) => {
              return (
                <PhonicSoundButton
                  key={index}  // Adiciona uma chave única para cada componente PhonicSoundButton
                  wordChunk={this.state.chunks[index]}
                  soundChunk={this.state.phonicSounds[index]}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

// Estilos para o componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  imageIcon: {
    width: 150,
    height: 150,
    marginLeft: 95,
  },
});
