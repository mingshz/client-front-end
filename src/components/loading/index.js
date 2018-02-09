import React from 'react'
import Spinner from 'react-spinkit'
import { Flex } from 'antd-mobile'

const Loading = props => {
  return (
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <Spinner name="pacman" color="#deb96b" />
    </Flex>
  )
}

export default Loading
