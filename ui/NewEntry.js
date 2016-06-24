import React from 'react';
import { connect } from 'react-apollo';
import { browserHistory } from 'react-router';
import { YaForm, yaWrap, Form, Actions } from 'ya-react-form';
import YaFormApollo from 'ya-react-form-apollo';

const Input = (props) => yaWrap(<input {...props} />);

const NewEntry = ({ mutations, submitRepository, submitForm, error }) => {
  function handleSubmit(event) {
    event.preventDefault();

    const repositoryName = event.target.repoFullName.value;
    submitForm(mutations.submitRepository, repositoryName);
  }

  return (
    <div>
      <h1>Submit a repository</h1>

      <Form name="submitRepository" onSubmit={handleSubmit}>
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

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}


        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </div>
  );
};

NewEntry.propTypes = {
  mutations: React.PropTypes.object.isRequired,
  submitRepository: React.PropTypes.object,
  submitForm: React.PropTypes.func,
  error: React.PropTypes.string,
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
  mapStateToProps: (state) => ({
    error: YaForm.getFormError(state, 'submitRepository'),
  }),
  mapDispatchToProps: (dispatch) => ({
    submitForm: (mutation) => YaFormApollo.create('submitRepository', mutation, dispatch),
  }),
})(NewEntry);

export default NewEntryWithData;
