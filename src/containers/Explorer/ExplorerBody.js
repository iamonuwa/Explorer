import React from 'react';
import styles from './ExplorerBody.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Text, Sort } from 'components';
import { LoadComponent } from 'hocs';
import { BountyCard } from 'explorer-components';
import { map } from 'lodash';
import {
  SORT_VALUE,
  SORT_CREATED,
  SORT_EXPIRY
} from 'public-modules/Bounties/constants';
import { rootBountiesSelector } from 'public-modules/Bounties/selectors';
import { actions } from 'public-modules/Bounties';

const ExplorerBodyComponent = props => {
  const { bounties, count, sort, setSort } = props;

  const renderBounties = () => {
    return map(bounty => {
      const {
        id,
        title,
        categories,
        user,
        experienceLevel,
        fulfillment_count,
        deadline,
        calculated_fulfillmentAmount,
        usd_price,
        tokenSymbol
      } = bounty;
      return (
        <BountyCard
          key={id}
          title={title}
          categories={categories}
          img={user.profile_image}
          address={user.public_address}
          experienceLevel={experienceLevel}
          submissions={fulfillment_count}
          deadline={moment(deadline, 'YYYY-MM-DDThh:mm:ssZ').fromNow(true)}
          value={Number(calculated_fulfillmentAmount).toFixed(2)}
          usd={Number(usd_price).toFixed(0)}
          currency={tokenSymbol}
        />
      );
    }, bounties);
  };

  return (
    <div className={styles.explorerBody}>
      <div className={styles.bodyHeading}>
        <div>
          <Text
            inline
            color="purple"
            typeScale="h3"
            className={styles.bountyNumber}
          >
            {count}
          </Text>
          <Text color="defaultGrey" inline>
            bounties
          </Text>
        </div>
        <div className={styles.sortGroup}>
          <Text
            inline
            weight="fontWeight-bold"
            color="black"
            typeScale="Body"
            className={styles.sortByText}
          >
            Sort By
          </Text>
          <Sort
            className={styles.sortBy}
            active={sort === SORT_VALUE}
            onSort={sortOrder => setSort(SORT_VALUE, sortOrder)}
          >
            Value
          </Sort>
          <Sort
            className={styles.sortBy}
            active={sort === SORT_CREATED}
            onSort={sortOrder => {
              console.log('yo');
              setSort(SORT_CREATED, sortOrder);
            }}
          >
            Creation Date
          </Sort>
          <Sort
            className={styles.sortBy}
            active={sort === SORT_EXPIRY}
            onSort={sortOrder => setSort(SORT_EXPIRY, sortOrder)}
          >
            Expiry
          </Sort>
        </div>
      </div>
      <div className={styles.bountyList}>{renderBounties()}</div>
    </div>
  );
};

const mapStateToProps = state => {
  const bountyState = rootBountiesSelector(state);

  return {
    bounties: bountyState.bounties,
    count: bountyState.count,
    sort: bountyState.sort
  };
};

const ExplorerBody = compose(
  connect(
    mapStateToProps,
    { load: actions.loadBounties, setSort: actions.setSort }
  ),
  LoadComponent('')
)(ExplorerBodyComponent);

export default ExplorerBody;
