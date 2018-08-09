import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubmissionItem.module.scss';
import { Button, Card, ListGroup, Text } from 'components';
import { FulfillmentStagePill, LinkedAvatar } from 'explorer-components';
import moment from 'moment';

const SubmissionItem = props => {
  const {
    name,
    address,
    img,
    url,
    email,
    description,
    dataHash,
    dataFileName,
    status,
    created,
    showAccept,
    showEdit
  } = props;

  const formattedTime = moment(created, 'YYYY-MM-DD').format('MM/DD/YYYY');

  return (
    <div className="">
      <div className="row">
        <div className={`col-xs-3 ${styles.detailsContainer} ${styles.filter}`}>
          <div className="row">
            <div className="col-xs-12">
              <LinkedAvatar
                className={styles.labelGroup}
                name={name}
                address={address}
                img={img}
                hash={address}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className={styles.labelGroup}>
                <Text color="defaultGrey" className={styles.label}>
                  Contact
                </Text>
                <Text>{email}</Text>
              </div>

              <div className={styles.labelGroup}>
                <Text color="defaultGrey" className={styles.label}>
                  Submitted
                </Text>
                <Text>{formattedTime}</Text>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-xs-6 ${styles.filter}`}>
          <div className={styles.labelGroup}>
            <Text color="defaultGrey" className={styles.label}>
              Web link
            </Text>
            <Text>{url || 'N/A'}</Text>
          </div>
          <div className={styles.labelGroup}>
            <Text color="defaultGrey" className={styles.label}>
              Description
            </Text>
            <Text>{description || 'N/A'}</Text>
          </div>

          <div className={styles.labelGroup}>
            <Text color="defaultGrey" className={styles.label}>
              Associated files
            </Text>
            <Text>{dataFileName || 'N/A'}</Text>
          </div>
        </div>
        <div className={`col-xs-3 ${styles.actionColumn}`}>
          <FulfillmentStagePill className={styles.label} accepted={status} />

          {showAccept ? (
            <Button
              type="action"
              className={styles.reactivateButton}
              icon={['far', 'check']}
              onClick={() => {}}
            >
              Accept
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

SubmissionItem.propTypes = {};

SubmissionItem.defaultProps = {};

export default SubmissionItem;
