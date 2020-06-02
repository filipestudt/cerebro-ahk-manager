import React, {Component} from 'react'
import { Loading, KeyboardNav, KeyboardNavItem } from 'cerebro-ui'
import styles from './styles.css'

export default class extends Component {
    renderScripts(data, exec) {
        return (
            <div className={styles.wrapper}>
                <KeyboardNav>
                <ul className={styles.list}>
                    {
                    data.map(s => (
                        <KeyboardNavItem
                            style={ s.isRunning ? {color: 'green'} : {} }
                            key={s.name}
                            tagName={'li'}
                            onSelect={() => exec(s)}>
                            {s.name}
                        </KeyboardNavItem>
                    ))
                    }
                </ul>
                </KeyboardNav>
            </div>
        )
    }

    render() {
       return this.renderScripts(this.props.data, this.props.exec);
    }
}