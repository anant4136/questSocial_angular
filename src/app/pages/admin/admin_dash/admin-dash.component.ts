import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import swal from 'sweetalert2';
import { UserloginService } from '../../../services/userlogin.service';
import Chart from 'chart.js/auto';
import { PostService } from '../../../services/post.service';
import { AnsService } from '../../../services/ans.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent implements OnInit {
  user: any = {};
  companies: any = [];
  company: any = {
    name: '',
    description: '',
    location: '',
    no_of_employees: ''
  };

  constructor(
    private companyService: CompanyService,
    private login: UserloginService,
    private postService: PostService,
    private ansService:AnsService
  ) { }

  createCompany(): void {
    this.companyService.createCompany(this.company).subscribe(
      (createdCompany: any) => {
        console.log(createdCompany);
        swal.fire('Registration Completed', 'Company name is ' + createdCompany.name);
      },
      error => {
        console.error('Error creating company', error);
        swal.fire('Registration Failed', 'Error creating company' + error);
      }
    );
  }

  userProblems: any = [];
  allproblems: any = [];
  allans: any = [];

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.companyService.getAllCompanies().subscribe(
      (data) => {
        this.companies = data;
        
        this.createDoughnutChart();
      },
      (error) => {
        console.error('Error fetching companies', error);
      }
    );

    this.postService.getUserProblems(this.user.id).subscribe(
      (data: any) => {
        this.userProblems = data;
        this.createPieChart();
      },
      (err: any) => {
        console.error('Error fetching user problems', err);
      }
    );

    this.postService.getAllProblems().subscribe(
      (data: any) => {
        this.allproblems = data;
        this.createAllProblemsLineGraph();
      }, (err: any) => {
        console.error('Error fetching all problems', err);
      }
    );
    this.ansService.getAllSolutions().subscribe(
      (data: any) => {this.allans = data;this.createLineChart();},
      (err:any) =>{console.log(err);}
    );
  }

  public linechart: any;
  public piechart: any;
  public doughnutchart: any;
  public allProblemsLineChart: any;

  createLineChart() {
   
    const solutionCounts = this.companies.reduce((acc: any, company: { name: string; }) => {
      acc[company.name] = 0;
      return acc;
    }, {});
  
    
    this.allans.forEach((ans: { solver: { company: { name: string; }; }; }) => {
      const companyName = ans.solver.company.name;
      if (solutionCounts[companyName] !== undefined) {
        solutionCounts[companyName]++;
      }
    });
  
    const labels = Object.keys(solutionCounts);
    const data = Object.values(solutionCounts);
  
    this.linechart = new Chart("MyLineChart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Solutions',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
          fill: true,
          tension: 0.1
        }]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  

  createPieChart() {
    const answeredCount = this.userProblems.filter((problem: { answered: boolean; }) => problem.answered).length;
    const unansweredCount = this.userProblems.length - answeredCount;

    this.piechart = new Chart("MyPieChart", {
      type: 'pie',
      data: {
        datasets: [{
          data: [answeredCount, unansweredCount],
          backgroundColor: [
            'rgb(0, 128, 0)',
            'rgb(255, 0, 0)'
          ]
        }],
        labels: ['Answered', 'Unanswered']
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  createDoughnutChart() {
    const labels = this.companies.map((company: { name: any; }) => company.name);
    const data = this.companies.map((company: { no_of_employees: any; }) => company.no_of_employees);

    this.doughnutchart = new Chart("MyDoughnutChart", {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)'
          ]
        }]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  createAllProblemsLineGraph() {
    // Initialize problemCounts with all company names set to zero
    const problemCounts = this.companies.reduce((acc: any, company: { name: string; }) => {
      acc[company.name] = 0;
      return acc;
    }, {});

    // Count the problems for each company
    this.allproblems.forEach((problem: { creator: { company: { name: string; }; }; }) => {
      const companyName = problem.creator.company.name;
      if (problemCounts[companyName] !== undefined) {
        problemCounts[companyName]++;
      }
    });

    const labels = Object.keys(problemCounts);
    const data = Object.values(problemCounts);

    this.allProblemsLineChart = new Chart("AllProblemsLineChart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Problems',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
          fill: true,
          tension: 0.1
        }]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
