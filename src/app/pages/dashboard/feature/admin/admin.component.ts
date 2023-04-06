import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDMenu } from 'src/app/core/models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  menus: IDMenu[] = [
    {
      title: 'Jobs', icon: 'fa-briefcase', route: '/jobs',
      crawler: '', style: ''
    },
    {
      title: 'Contracts & Legal', icon: 'fa-file-contract', route: '/contracts',
      crawler: '', style: ''
    },
    {
      title: 'Hiring', icon: 'fa-person-sign', route: '/hiring',
      crawler: '', style: ''
    },
    {
      title: 'Invoice', icon: 'fa-file-invoice-dollar', route: '/invoice',
      crawler: '', style: ''
    },
    {
      title: 'Clients', icon: 'fa-user-tie', route: '/seekers',
      crawler: '', style: ''
    },
    {
      title: 'Projects', icon: 'fa-file-code', route: '/projects',
      crawler: '', style: ''
    },
  ];
  navGroup: IDMenu[] = [
    {
      title: 'Add Client', icon: 'fa-user-plus', route: '/seekers/add',
      crawler: '', style: ''
    },
    /* {
      title: 'Add Project', icon: 'fa-file-plus', route: '/projects',
      crawler: '', style: ''
    },
    {
      title: 'Add Job', icon: 'fa-file-plus', route: '/jobs',
      crawler: '', style: ''
    }, */
    {
      title: 'Notifications', icon: 'fa-bells', route: '/notifications',
      crawler: '', style: ''
    },
  ]

  constructor(
    private readonly router: Router) { }

  ngOnInit(): void {
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }

}
