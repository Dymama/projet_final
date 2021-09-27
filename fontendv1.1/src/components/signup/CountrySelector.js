import React, { useState, useMemo } from 'react'
import Select from 'react-select'



function CountrySelector(props) {

  return <Select options={props.optionsValueCountry} value={props.valueCountry} onChange={props.changeHandlerValueCountry} />
}

export default CountrySelector