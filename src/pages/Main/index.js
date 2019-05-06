import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import logo from '../../assets/logo.png';

import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    loading: false,
    repoError: false,
    repoInput: '',
    repositories: [],
  };

  async componentDidMount() {
    this.setState({ repositories: await this.getLocalRepos() });
  }

  getLocalRepos = async () => JSON.parse(await localStorage.getItem('GoReactMD02')) || [];

  handleAddRepository = async (e) => {
    e.preventDefault();
    const { repoInput, repositories } = this.state;

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${repoInput}`);

      // Deve se evitar modificar uma informação dentro de um render
      // o melhor local para isso é assim que o dado é recebido
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repoInput: '',
        repositories: [...repositories, repository],
        repoError: false,
      });

      const localRepos = await this.getLocalRepos();

      await localStorage.setItem('GoReactMD02', JSON.stringify([...localRepos, repository]));
    } catch (err) {
      this.setState({
        repoError: true,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDeleteRepo = async (repoId) => {
    const { repositories } = this.state;

    const finalRepositories = repositories.filter(repository => repository.id !== repoId);

    this.setState({ repositories: finalRepositories });

    await localStorage.setItem('GoReactMD02', JSON.stringify([...finalRepositories]));
  };

  handleRefresh = async (repoId) => {
    const { repositories } = this.state;

    const updatedRepo = repositories.find(repo => repo.id === repoId);

    try {
      const { data } = await api.get(`/repos/${updatedRepo.full_name}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repoError: false,
        repoInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });

      await localStorage.setItem('GoReactMD02', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repoError: true });
    }
  };

  render() {
    const {
      loading, repoError, repoInput, repositories,
    } = this.state;

    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form onSubmit={this.handleAddRepository} withError={repoError}>
          <input
            type="text"
            placeholder="Usuário/Repositório"
            value={repoInput}
            onChange={e => this.setState({ repoInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList
          repositories={repositories}
          deleteRepo={this.handleDeleteRepo}
          refreshRepo={this.handleRefresh}
        />
      </Container>
    );
  }
}
