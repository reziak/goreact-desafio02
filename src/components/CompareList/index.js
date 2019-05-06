import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faRedo } from '@fortawesome/free-solid-svg-icons';

import {
  Container, Repository, DeleteButton, RefreshButton,
} from './styles';

const CompareList = ({ repositories, deleteRepo, refreshRepo }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id} id={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            {repository.stargazers_count} <small>stars</small>
          </li>
          <li>
            {repository.forks_count} <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count} <small>issues</small>
          </li>
          <li>
            {repository.lastCommit} <small>last commit</small>
          </li>
        </ul>
        <RefreshButton onClick={() => refreshRepo(repository.id)}>
          <FontAwesomeIcon icon={faRedo} />
        </RefreshButton>
        <DeleteButton onClick={() => deleteRepo(repository.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </DeleteButton>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        avatar_url: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
      }),
      stargazers_count: PropTypes.number.isRequired,
      forks_count: PropTypes.number.isRequired,
      open_issues_count: PropTypes.number.isRequired,
      pushed_at: PropTypes.string.isRequired,
    }),
  ).isRequired,
  deleteRepo: PropTypes.func.isRequired,
  refreshRepo: PropTypes.func.isRequired,
};

export default CompareList;
