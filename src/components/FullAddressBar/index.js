import React from 'react';
import PropTypes from 'prop-types';
import styles from './FullAddressBar.module.scss';

import { Text, Button } from 'components';
import { i } from '../../fontawesome-all';

const FullAddressBarComponent = props => {
  const { address, copyButton } = props;

  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    console.log('Address copied: ', str);
    alert('Address copied: ' + str);
  };

  return (
    <div className={`${styles.FullAddressBar}`}>
      <div className={`${styles.AddressBar}`}>
        <Text color="purple" style="BodySmall" id="ethAddress">
          {address}
        </Text>
      </div>
      <div style={{ marginLeft: '5px' }}>
        <Button
          size="icon"
          style="secondary"
          onClick={e => copyToClipboard(address)}
        >
          <i className="far fa-cut" />
        </Button>
      </div>
    </div>
  );
};

FullAddressBarComponent.propTypes = {
  address: PropTypes.string
};

FullAddressBarComponent.defaultProps = {
  address: '0x0000000000000000000000000000000000000000'
};

export default FullAddressBarComponent;