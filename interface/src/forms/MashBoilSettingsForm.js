import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Divider } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const ONCSwitch = withStyles({
  switchBase: {
    color: indigo[0],
    '&$checked': {
      color: indigo[300],
    },
    '&$checked + $track': {
      backgroundColor: indigo[100],
    },
  },
  checked: {},
  track: {},
})(Switch);

class MashBoilSettingsForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      n: '',
      t: '',
      tm: '',
      a: '',
      fp: false,
      r: true,
      sl: false,
      ho: true,
      index: null
    }
  }

  addItem = (event) => {
    this.props.callbackItemAdded(this.state)
    this.cancel()
  }

  cancel = () => {
    this.setState({ n: '', t: '', tm: '', a: '', r: true, sl: false, ho: true, fp: false, index: null })
  }

  handleIndexChange = (index) => {
    this.setState({ index: index })
  }

  handleNameChange = (e) => {
    this.setState({ n: e.target.value })
  }

  handleTemperatureChange = (e) => {
    this.setState({ t: e.target.value })
  }

  handleTimeChange = (e) => {
    this.setState({ tm: e.target.value })
  }

  handleAmountChange = (e) => {
    this.setState({ a: e.target.value })
  }

  handleRecirculationChange = (e, checked) => {
    this.setState({ r: checked })
  }

  handleStepLock = (e, checked) => {
    this.setState({ sl: checked })
  }

  handleHeaterOn = (e, checked) => {
    this.setState({ ho: checked })
    if (!checked)
      this.setState({ fp: checked })
  }

  handleFullPower = (e, checked) => {
    this.setState({ fp: checked })
    if (checked)
      this.setState({ ho: checked })
  }

  render() {
    return (
      <ValidatorForm ref="form" onSubmit={this.addItem} onError={error => console.log(error)}>
        <TextValidator
          label="Name"
          fullWidth
          name="n"
          value={this.state.n}
          onChange={this.handleNameChange}
          validators={['required']}
          errorMessages={['this field is required']} />
        {
          !this.props.boil ?
            <TextValidator
              name="t"
              validators={['required']}
              label="Temperature"
              type="number"
              fullWidth
              InputProps={{ endAdornment: <InputAdornment position="start">ºC</InputAdornment> }}
              value={this.state.t}
              onChange={this.handleTemperatureChange}
              errorMessages={['this field is required']}
            />
            : null
        }
        <TextValidator
          name="tm"
          validators={['required']}
          label="Time"
          type="number"
          fullWidth
          InputProps={{ endAdornment: <InputAdornment position="start">min</InputAdornment> }}
          value={this.state.tm}
          onChange={this.handleTimeChange}
          errorMessages={['this field is required']}
        />
        {
          this.props.boil ?
            <TextValidator
              name="a"
              validators={['required']}
              label="Amount"
              type="number"
              fullWidth
              InputProps={{ endAdornment: <InputAdornment position="start">g</InputAdornment> }}
              value={this.state.a}
              onChange={this.handleAmountChange}
              errorMessages={['this field is required']}
            />
            : null
        }
        {!this.props.boil ? <FormControlLabel control={<ONCSwitch ref="r" checked={this.state.r} onChange={this.handleRecirculationChange} />} label="Pump" /> : null}
        {!this.props.boil ? <FormControlLabel control={<ONCSwitch ref="ho" checked={this.state.ho} onChange={this.handleHeaterOn} />} label="Heater" /> : null}
        {!this.props.boil ? <FormControlLabel control={<ONCSwitch ref="fp" checked={this.state.fp} onChange={this.handleFullPower} />} label="Full Power Heater" /> : null}
        {!this.props.boil ? <FormControlLabel control={<ONCSwitch ref="sl" checked={this.state.sl} onChange={this.handleStepLock} />} label="Step LOCK" /> : null}
        <Divider />
        <Button type="submit" variant="contained" fullWidth color="secondary">save</Button>
        {this.state.index !== null ?
          <Button variant="contained" fullWidth color="primary" onClick={this.cancel}>cancel</Button>
          : null}
      </ValidatorForm>
    )
  }
}

export default (MashBoilSettingsForm);