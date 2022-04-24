import React from "react";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  activateEditMode = () => {
    this.setState({ editMode: true });
  };
  deActivateEditMode = () => {
    let userId = this.props.userId;
    this.setState({ editMode: false });
    if (!userId) {
      userId = 2;
    }
    this.props.updateStatus(userId, this.state.status);
  };
  onStatusChange = (e) => {
    this.setState({ status: e.currentTarget.value });
  };

  render() {
    return (
      <>
        <div>
          <div>
            {!this.state.editMode && (
              <span onDoubleClick={this.activateEditMode}>
                {this.props.status || "---"}
              </span>
            )}
          </div>
          <div>
            {this.state.editMode && (
              <input
                autoFocus
                onBlur={this.deActivateEditMode}
                type="text"
                onChange={this.onStatusChange}
                value={this.state.status}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default ProfileStatus;
