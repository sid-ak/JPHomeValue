import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address-service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor (private readonly addressService: AddressService) { }

  ngOnInit(): void {
    this.addressService.addressChanged$.subscribe(
      e => console.log(e)
    );
  }
}
