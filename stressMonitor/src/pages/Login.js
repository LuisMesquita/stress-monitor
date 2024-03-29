import React, {Fragment, Component} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, 
    ScrollView, KeyboardAvoidingView, Animated, Easing } from 'react-native';
import * as _ from 'lodash';

import Rectangle from '../assets/Rectangle';
import Spinner from 'react-native-loading-spinner-overlay';

import firebase from 'react-native-firebase';

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isAuthenticated: false,
            isVisible: false,
            error: false,
            errorMail: false,
            textValue: new Animated.Value(0),
            inputValue: new Animated.Value(0),
            passValue: new Animated.Value(0),
        }
    }
    
    login = () => {
        this.setState({ error: false });
        this.setState({ errorMail: false });
        const { email, password } = this.state;

        if (email && password) {
            this.setState({ isVisible: true});
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ isVisible: false });
                this.setState({ isAuthenticated: true });
                if (firebase.auth().currentUser.emailVerified) {
                    this.props.navigation.navigate('main');
                } else {
                    this.setState({ errorMail: true });
                }
            })
            .catch(err => {
                this.setState({ isVisible: false });
                this.setState({ error: true });
                console.log(err);
            });
        }
    }

    create = () => {
        this.props.navigation.navigate('Register');
    }

    _moveAnimationEmail = () => {
        Animated.timing(this.state.textValue, {
            toValue: 27,
            duration: 100,
            asing: Easing.linear
        }).start();
        
    }

    _moveAnimationPass = ()  => {
        Animated.timing(this.state.passValue, {
            toValue: 27,
            duration: 100,
            asing: Easing.linear
        }).start();
    }
    _descer = () => {
        Animated.timing(this.state.textValue, {
            toValue: 0,
            duration: 50,
            asing: Easing.linear
        }).start();
    }
    _descerPass = () => {
        Animated.timing(this.state.passValue, {
            toValue: 0,
            duration: 50,
            asing: Easing.linear
        }).start();
    }
    
    render() {
       
        return (
            <Fragment>
                <StatusBar backgroundColor="#87CEFA" />
                <SafeAreaView>
                    <ScrollView>
                        <KeyboardAvoidingView
                            style={{flex:1}}
                            behavior='position'
                            enabled
                        >
                            <View style={styles.header}>
                               <Rectangle />
                               {this.state.error 
                                ? <Text style={styles.errorText}>Email e/ou senha inválidos</Text> 
                                : <Text></Text>}
                               {this.state.errorMail
                                ? <Text style={styles.errorText}>Verifique seu email</Text> 
                                : <Text></Text>}
                            </View>

                            <View style={styles.viewInput, [{top: '13%'}]}>
                                <Animated.View style={[styles.viewInput, {bottom: this.state.textValue}]}>
                                    <Text style={styles.textAnime}>Email</Text>
                                </Animated.View>
                            </View>
                            <View>
                                <Animated.View style={[styles.viewInput, {bottom: this.state.inputValue}]}>
                                    <TextInput 
                                        style={styles.textInput}  
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={this.state.email}
                                        onChangeText={email => this.setState({email: email})}
                                        onTouchStart={this._moveAnimationEmail}
                                        onEndEditing={!this.state.email && this._descer}
                                    />
                                </Animated.View>
                            </View>
                            <View style={styles.viewInput, [{top: '6%'}]}>
                                <Animated.View style={[styles.viewInput, {bottom: this.state.passValue}]}>
                                    <Text style={styles.textAnime}>Senha</Text>
                                </Animated.View>
                            </View>
                            <View>
                                <Animated.View style={[styles.viewInput, {bottom: this.state.inputValue}]}>
                                    <TextInput 
                                        style={styles.textInput2} 
                                        secureTextEntry={true}
                                        value={this.state.password}
                                        onTouchStart={this._moveAnimationPass}
                                        onEndEditing={!this.state.password && this._descerPass}
                                        onChangeText={password => this.setState({password: password})}
                                    />
                                    <TouchableOpacity >
                                        <Text style={styles.senhaText}>
                                            Esqueceu sua senha?
                                        </Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                            <View style={styles.containerButton}>
                                <Spinner 
                                    visible={this.state.isVisible}
                                    />
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={this.login}
                                    >
                                    <Text style={styles.textButton}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={this.create}
                                    >
                                    <Text 
                                        style={styles.contaText}
                                        >
                                        Não tem uma conta?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </SafeAreaView>
            </Fragment>
        );        
    }
}

const styles = StyleSheet.create({
    //Amimated
    textAnime: {
        top:'45%', 
        left: '12%',
        fontFamily: 'Montserrat-Regular',
        fontSize:18,
        opacity: 0.4
    },

    //Static
    header: {
        margin: 0,
        top: "10%",
        alignItems: "center",
    },
    textInput: {
        borderStyle: 'solid',
        fontSize:18,
        marginHorizontal: 35,
        borderBottomWidth: 2,
        borderColor: "#87CEFA",
        marginTop: '20%',
        fontFamily: 'Montserrat-Regular'
    },
    textInput2: {
        borderStyle: 'solid',
        fontSize: 18,
        marginHorizontal: 35,
        borderBottomWidth: 2,
        borderColor: "#87CEFA",
        marginTop: "4%",
        justifyContent: "center",
        fontFamily: 'Montserrat-Regular'
    },
    viewInput: {
        paddingHorizontal: "5%"
    },
    senhaText: {
        paddingTop: "3%",
        alignSelf: "flex-end",
        paddingRight: 40,
        fontSize: 14,
        textDecorationLine: "underline",
        fontFamily: 'Montserrat-Regular'
    },
    containerButton:{
        paddingVertical:30,
        alignItems: 'center',
    },
    button: {
        backgroundColor:'#87CEFA',
        width: 253,
        height: "26%"
    },
    textButton: {
        textAlign:'center',
        fontWeight: '100',
        fontSize: 20,
        alignItems: "center",
        padding: 14,
        fontFamily: 'Montserrat-Regular'
    },
    contaText: {
        paddingTop: "3%",
        alignItems: "flex-start",
        fontSize: 14,
        textDecorationLine: "underline",
        fontFamily: 'Montserrat-Regular'
    },
    errorText: {
        color: 'red',
        fontFamily: 'Montserrat-Medium'
    }
});

export default Login;
