import React from 'react'
import { inject, observer } from "mobx-react"
import { Configuration } from './Configuration'
import { Authority } from './Authority'
import pattern from '../assets/images/pattern.svg'


@inject("RootStore")
@observer
export class StatusPage extends React.Component {

  render() {
    const { homeStore, foreignStore, web3Store } = this.props.RootStore
    const isHome = web3Store.metamaskNet.id.toString() === web3Store.homeNet.id.toString()
    const requiredSignatures = isHome ? homeStore.requiredSignatures : foreignStore.requiredSignatures
    const authorities = isHome ? homeStore.validators.length : foreignStore.validators.length
    const symbol = isHome ? homeStore.symbol : foreignStore.symbol
    const maxSingleDeposit = isHome ? homeStore.maxPerTx : foreignStore.maxPerTx
    const maxTotalBalance = isHome ? homeStore.maxCurrentDeposit : foreignStore.maxCurrentDeposit
    const validatorsList = isHome ? homeStore.validators : foreignStore.validators
    return (
      <div className="status-page">
        <div className='status-left-container' />
        <div className='status-page-container'>
          <div className='status-configuration-container'>
            <span className='status-configuration-title status-title'>Configuration</span>
              <Configuration
                requiredSignatures={requiredSignatures}
                authorities={authorities}
                symbol={symbol}
                maxSingleDeposit={maxSingleDeposit}
                maxTotalBalance={maxTotalBalance} />
          </div>
          <div className='status-authorities-container'>
            <span className='status-authorities-title status-title'>Authorities</span>
            <div className='status-authorities-data'>
              {validatorsList.map((validator,i) => (
                <Authority key={validator} address={validator} number={(i+1)} logoIndex={(i) % 3} />
              ))}
            </div>
          </div>
        </div>
        <div className='status-right-container'>
          <img className='status-right-image' src={pattern} alt=""/>
        </div>
      </div>
    )
  }
}
