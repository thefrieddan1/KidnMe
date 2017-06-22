import React, { Component } from 'react';
import { Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Button, Card, CardSection, Input, Spinner } from './common';
import {
  idChanged, emailChanged, passwordChanged, loginUser, annonymosLoginUser
} from '../actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { userType: 'staff' };
  }

  onIdentityChange(text) {
    if (this.state.userType === 'staff') {
      this.props.emailChanged(text);
    } else {
      this.props.idChanged(text);
    }
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
      const { email, password, id } = this.props;

      if (this.state.userType === 'staff') {
        this.props.loginUser({ email, password });
      } else {
        this.props.annonymosLoginUser({ id });
      }
  }

getInputValue() {
  if (this.state.userType === 'staff') {
    return (this.props.email);
  } else {
    return (this.props.id);
  }
}

renderPasswordInput() {
  if (this.state.userType === 'staff') {
    return (
      <Input
        secureTextEntry
        label="password"
        placeholder="password"
        onChangeText={this.onPasswordChange.bind(this)}
        value={this.props.password}
      />
    );
  }
}

renderButton() {
  if (this.props.loading) {
    return <Spinner size='large' />;
  }
  return (
    <Button onPress={this.onButtonPress.bind(this)}>
      Login
    </Button>
  );
}
  render() {
    const firstInputLabel = this.state.userType === 'staff' ? 'Email' : 'ID';
    const firstInputPlaceHolder = this.state.userType === 'staff' ? 'email@gmail.com' : '1234567';
    return (
      <Card>
        <CardSection>
          <Input
            label={firstInputLabel}
            placeholder={firstInputPlaceHolder}
            onChangeText={this.onIdentityChange.bind(this)}
            value={this.getInputValue()}
          />
        </CardSection>

        <CardSection>
          {this.renderPasswordInput()}
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
        <Picker
          selectedValue={this.state.userType}
          onValueChange={(itemValue) => this.setState({ userType: itemValue })}
        >
          <Picker.Item label="Staff" value="staff" />
          <Picker.Item label="Parent" value="parent" />
      </Picker>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading, id } = auth;
    return { email, password, error, loading, id };
};

export default connect(mapStateToProps, {
  idChanged, emailChanged, passwordChanged, loginUser, annonymosLoginUser
})(LoginForm);
