import React from 'react';
import {cx, css} from '@emotion/css';
import {Link} from 'react-router-dom';

import {useAlgorand} from '../../../Packages/Algorand';

import {LoadingIndicator} from '../../../Packages/AlgorandSigner/Components';
import {Button} from '../../../Components';
import {Breadcrumbs} from '../../../Components/Page';

const styles = {
  item: css({
    margin: '0 0 16px 0',
  })
};

function Applications(props) {
  const algorand = useAlgorand();
  const [applications, setApplications] = React.useState(null);

  const findApplications = React.useCallback(
    async () => {
      if (algorand.state.account) {
        const applications = await algorand.fetchApplications();
        setApplications(applications);
      }
    },
    [algorand]
  );

  React.useEffect(() => {
    findApplications();
  }, [findApplications]);

  return (
    <>
      <Breadcrumbs />
      <h1 className="title">Applications</h1>
      <h2 className="subtitle">A list of your deployed applications</h2>
      {!applications &&
        <LoadingIndicator message="Searching for applications..." />
      }
      {applications && applications.length === 0 &&
        <p className={cx(styles.item)}>
          You haven't deployed any applications using <Link to="/author">Author</Link>.
        </p>
      }
      {applications && applications.map((application) => {
        const timestamp = new Date(application.timestamp * 1000);
        const date = `${timestamp.getFullYear()}-${timestamp.getMonth()}-${timestamp.getDay()}`;
        const time = `${timestamp.getHours()}:${timestamp.getMinutes()}`;
        return (
          <p key={application.ID} className={cx(styles.item)}>
            <Button
              title={application.ID}
              href={algorand.linkTo('application', application.ID)}
              isExternal
            />
            &nbsp;
            <span className="tag is-light">
              {date} {time}
            </span>
            &nbsp;
            {application.title}
          </p>
        );
      })}
    </>
  );
}

export {Applications};