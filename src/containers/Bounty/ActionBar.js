import React from 'react';
import styles from './ActionBar.module.scss';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'components';
import { DEAD } from 'public-modules/Bounty/constants';
import { UPLOAD_KEY } from './constants';
import { ModalManager } from './components';

const ActionBar = props => {
  const {
    isDraft,
    bounty,
    user,
    history,
    modalType,
    modalVisible,
    closeModal,
    showModal,
    killBounty,
    activateDraftBounty,
    walletAddress,
    activateDeadBounty,
    extendDeadline,
    increasePayout,
    uploadFile,
    resetUpload,
    uploadState,
    fulfillBounty
  } = props;

  const belongsToLoggedInUser = user && bounty.issuer === user.public_address;
  const loggedOutButAddressMatches = !user && bounty.issuer === walletAddress;

  let actionOptions = null;
  if (isDraft) {
    actionOptions = (
      <div>
        <Button
          type="action"
          fitWidth
          className={styles.activateButton}
          onClick={() => {
            if (moment(bounty.deadline) < moment()) {
              return showModal('deadlineWarning');
            }
            showModal('activate');
          }}
        >
          Activate Bounty
        </Button>
        <Link to={`/createBounty/draft/${bounty.id}/`}>
          <Button fitWidth className={styles.editBountyButton}>
            Edit Bounty
          </Button>
        </Link>
      </div>
    );
  }

  if (!isDraft && belongsToLoggedInUser) {
    actionOptions = (
      <div>
        {bounty.bountyStage === DEAD ? (
          <Button
            type="action"
            className={styles.reactivateButton}
            fitWidth
            onClick={() => showModal('activateDead')}
          >
            Re-Activate Bounty
          </Button>
        ) : (
          <Button
            type="destructive"
            className={styles.killButton}
            fitWidth
            onClick={killBounty}
          >
            Kill bounty
          </Button>
        )}
        <Button
          icon={['far', 'calendar-alt']}
          fitWidth
          className={styles.buttonGroup}
          onClick={() => showModal('extendDeadline')}
        >
          Change deadline
        </Button>
        <Button
          icon={['far', 'user-alt']}
          fitWidth
          className={styles.buttonGroup}
        >
          Transfer Ownership
        </Button>
        <Button
          onClick={() => showModal('increasePayout')}
          icon={['far', 'dollar-sign']}
          fitWidth
          className={styles.buttonGroup}
        >
          Change Prize
        </Button>
      </div>
    );
  }

  if (!belongsToLoggedInUser) {
    actionOptions = (
      <div>
        <Button
          type="action"
          fitWidth
          onClick={() => showModal('fulfillBounty')}
        >
          Sign in to fulfill
        </Button>
        <Button
          icon={['far', 'dollar-sign']}
          className={styles.buttonGroup}
          fitWidth
        >
          Contribute
        </Button>
      </div>
    );
  }

  return (
    <div>
      <ModalManager
        visible={modalVisible}
        onClose={closeModal}
        modalType={modalType}
        uploadKey={UPLOAD_KEY}
        uploadState={uploadState}
        uploadFile={uploadFile}
        resetUpload={resetUpload}
        onActivateDraft={activateDraftBounty}
        onExtendDeadlineError={
          isDraft
            ? () => history.push(`/createBounty/draft/${bounty.id}/`)
            : null
        }
        extendDeadline={extendDeadline}
        activateDeadBounty={activateDeadBounty}
        increasePayout={increasePayout}
        fulfillBounty={fulfillBounty}
        bounty={bounty}
      />
      {actionOptions}
    </div>
  );
};

export default withRouter(ActionBar);
