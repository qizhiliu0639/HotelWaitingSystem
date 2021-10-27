const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

const InputStyle = {
  textAlign:'center'
}

const TbStyle = {
  border: '1px solid black',
  margin:'0 auto',
  width:'10%',
  textAlign: 'center',
}

const TrStyle = {
  background: 'aliceblues',
  margin:'0 auto',
  width:'10%',
  textAlign: 'center',
}

const FreeSlotsStyle = {
  textAlign:'center',
  fontFamily:"Times New Roman",
  fontSize:'40px',
}

const HomepageStyle ={
  color:'black',
  textAlign:'center',
  fontFamily:"Times New Roman",
  fontSize:'50px',
}

const FreeSpaceStyle = {
  fontSize:'50px'
}

const TableStyle = {
  borderCollapse:'collapse',
  tableLayout:'fixed',
  width:'40%',
  margin:'0 auto',
}

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

class HomePage extends React.Component {
  render() {
      return (
          <div style = {HomepageStyle}>
              <h1>Hotel California Waitlist System</h1>
          </div>
      );
  }
}

class FreeSlots extends React.Component {
  render() {
      return (
          <div style ={FreeSlotsStyle}>
              <p>There is <span style = {FreeSpaceStyle} id ="freespace">{this.props.number}</span> slots available</p>
          </div>);
  };
}

function IssueRow(props) {
  const issue = props.issue;
  return (
    <tr style={TrStyle}>
        <td style={TbStyle}>{issue.id}</td>
        <td style={TbStyle}>{issue.name}</td>
        <td style={TbStyle}>{issue.phoneNumber}</td>
        <td style={TbStyle}>{issue.date.toDateString()}</td>
    </tr>
  );
}

function IssueTable(props) {
  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue.id} issue={issue} />
  );

  return (
    <table className="bordered-table">
      <caption>Entry List</caption>
      <thead>
        <tr style={TrStyle}>
            <td>Serial No.</td>
            <td>Name</td>
            <td>Phone Number</td>
            <td>Time</td>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}

class IssueDelete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isNumber(value) {
    var reg = /^[\d|\.]*$/;
    return reg.test(value)
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.deleteCustomer;
    const issue = {
        id : form.id.value,
    }
    if (form.id.value == ""){
        alert("The Input DeleteID shouldn't be None")
    } else if (!this.isNumber(form.id.value)) {
        alert("The DeleteID is not number")
    } else {
        this.props.deleteIssue(issue.id);
        form.id.value = "";
    }
}

  render() {
    return (
      <form name="deleteCustomer" onSubmit={this.handleSubmit} style={InputStyle}>
          <input type = "text" name = "id" placeholder="DeleteID"></input>
          <button>DeleteCustomer</button>
      </form>
    );
  }
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isNumber(value) {
    var reg = /^[\d|\.]*$/;
    return reg.test(value)
  }
  getdate() {
    var now = new Date(),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.addCustomer;
    const issue = {
        name: form.name.value, phoneNumber: form.phoneNumber.value,
        date : this.getdate,
    }
    if (form.name.value == ""){
        alert("The Input name shouldn't be None")
    } else if (!this.isNumber(form.phoneNumber.value)) {
        alert("The Phone Number is not number")
    } else if(form.phoneNumber.value==''){
        alert("The Phone Number shouldn't be None")
    } else {
        this.props.createIssue(issue);
        form.name.value = ""; form.phoneNumber.value = "";
    }
}

  render() {
    return (
      <form name="addCustomer" onSubmit={this.handleSubmit} style={InputStyle}>
          <input type = "text" name = "name" placeholder="Name"></input>
          <input type = "text" name = "phoneNumber" placeholder="Phone Number"></input>
          <button>AddCustomer</button>
      </form>
    );
  }
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    // this.num = this.state.issues.length;
  }


  componentDidMount() {
    this.loadData();
    this.num = this.state.issues.length;
  }

  async loadData() {
    const query = `query {
      issueList {
        id name phoneNumber date
      }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
      // this.num = this.state.issues.length;
    }
  }

  async createIssue(issue) {

    if (this.state.issues.length < 25){
    // this.num += 1;
      const query = `mutation issueAdd($issue: CustomerInputs!) {
        issueAdd(issue: $issue) {
          id
        }
      }`;

      const data = await graphQLFetch(query, { issue });
      if (data) {
        this.loadData();
      }
    } else {
      alert("There is no place to Add");
    }
  }

  async deleteIssue(issueID) {
    if (this.state.issues.length > 0){
      // this.num -= 1;
      const query = `mutation issueDelete($issueID:Int!) {
        issueDelete(issueID: $issueID) {
          id
        }
      }`;

      const data = await graphQLFetch(query, { issueID });
      if (data) {
        this.loadData();
      }
    } else {
      alert("There is no place to delete")
    }
  }

  render() {
    return (
      <React.Fragment>
        <HomePage />
        <FreeSlots number={25 - this.state.issues.length}/>
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
        <hr />
        <IssueDelete deleteIssue={this.deleteIssue}/>
      </React.Fragment>
    );
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));