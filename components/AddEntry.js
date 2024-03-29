import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {getMetricMetaInfo, timeToString} from "../utils/helpers";
import UdacitySlider from './UdacitySlider'
import UdacityStepper from './UdacityStepper'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'

function Submitbtn({ onPress }){
    return (
        <TouchableOpacity
        onPress={onPress}>
            <Text>Submit</Text>
        </TouchableOpacity>
    )
}


export default class AddEntry extends Component{

    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    }

    increment = (metric) => {
        const { max, step} = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] + step

            return {
                ...state,
                [metric]:count > max ? max : count,
            }

        })
    }

    decrement = (metric) => {
        const { max, step} = getMetricMetaInfo(metric)

        this.setState((state) => {
            const count = state[metric] - step

            return {
                ...state,
                [metric]:count < 0 ? 0 : count,
            }

        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value,
        }))
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        //update Redux


        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        }))
        //goto Home

        //save to DB

        //clear local notification

    }

    reset = () => {

        const key = timeToString()

        //update Redux


        //route to HOME


        //update DB
    }


    render(){

        const metaInfo = getMetricMetaInfo()

        if(this.props.alreadyLogged){
            return (
                <View>
                    <Ionicons
                        name='ios-happy'
                        size={100}
                    />
                    <Text>You already logged your information for today</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        return (
            <View>
                <DateHeader date={new Date().toLocaleDateString()}/>

                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key];

                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                                ? <UdacitySlider
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                /> : <UdacityStepper
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />}
                        </View>
                    )

                })}
                <Submitbtn onPress={this.submit}/>


            </View>

        )
    }
}