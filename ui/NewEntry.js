import React from 'react';
import { connect } from 'react-apollo';
import { browserHistory } from 'react-router';
import { Form, wrap } from 'ya-react-redux-form';
import { ApolloForm } from 'ya-react-apollo-form';

const Input = (props) => wrap(<input {...props} />);

const NewEntry = ({ mutations, submitRepository }) => {
  function handleSubmit(event) {
    event.preventDefault();

    const repositoryName = event.target.repoFullName.value;
    mutations.submitRepository(repositoryName).then((res) => {
      if (! res.errors) {
        browserHistory.push('/feed/new');
      }
    });
  }

  return (
    <div>
      <h1>Submit a repository</h1>

      <ApolloForm name="submitRepository" mutation={mutations.submitRepository}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">
            Repository name
          </label>

          <Input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="repoFullName"
            placeholder="apollostack/GitHunt"
          />
        </div>

        {submitRepository.errors && (
          <div className="alert alert-danger" role="alert">
            {submitRepository.errors[0].message}
          </div>
        )}


        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </ApolloForm>
    </div>
  );
};

NewEntry.propTypes = {
  mutations: React.PropTypes.object.isRequired,
  submitRepository: React.PropTypes.object,
};

const NewEntryWithData = connect({
  mapMutationsToProps: () => ({
    submitRepository: (repoFullName) => ({
      mutation: gql`
        mutation submitRepository($repoFullName: String!) {
          submitRepository(repoFullName: $repoFullName) {
            createdAt
          }
        }
      `,
      variables: {
        repoFullName,
      },
    }),
  }),
})(NewEntry);

export default NewEntryWithData;
