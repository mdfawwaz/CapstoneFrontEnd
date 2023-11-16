import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements AfterViewInit {
  public locationInputValue: string = '';
  public aptSuiteValue: string = '';
  public cityValue: string = '';
  public stateValue: string = '';
  public zipValue: string = '';
  public countryValue: string = '';
  public locations: any[] = []; 


  constructor(public locationservice:LocationService){}

 
  ngOnInit() {
    this.initMap();
    this.loadLocations();
  }

  loadLocations() {
    this.locationservice.getLocations().subscribe(
      (locations: any[]) => {
        this.locations = locations;
      },
      (error: any) => {
        console.error('Error loading locations:', error);
      }
    );
  }


  onCheckout() {
    const location = {
      location: this.locationInputValue,
      suite: this.aptSuiteValue,
      city: this.cityValue,
      state: this.stateValue,
      zipCode: this.zipValue,
      country: this.countryValue,
    };

    this.locationservice.saveLocation(location).subscribe(
      (response) => {
        console.log('Location saved successfully!', response);
      },
      (error) => {
        console.error('Error saving location:', error);
      }
    );
  }
  
  @ViewChild('gmpMap') gmpMap: ElementRef | any;
  @ViewChild('locationInput') locationInput: ElementRef | any;
  @ViewChild('aptSuite') aptSuite: ElementRef | any;
  @ViewChild('city') city: ElementRef | any;
  @ViewChild('state') state: ElementRef | any;
  @ViewChild('zip') zip: ElementRef | any;
  @ViewChild('country') country: ElementRef | any;

  initMap() {
    this.locationInputValue = this.locationInput.nativeElement.value;
    this.aptSuiteValue = this.aptSuite.nativeElement.value;
    this.cityValue = this.city.nativeElement.value;
    this.stateValue = this.state.nativeElement.value;
    this.zipValue = this.zip.nativeElement.value;
    this.countryValue = this.country.nativeElement.value;
  
    const CONFIGURATION = {
      ctaTitle: 'Checkout',
      mapOptions: {
        center: { lat: 37.4221, lng: -122.0841 },
        fullscreenControl: true,
        mapTypeControl: false,
        streetViewControl: true,
        zoom: 11,
        zoomControl: true,
        maxZoom: 22,
        mapId: ''
      },
      mapsApiKey: 'AIzaSyDvZkqm5AocfLgLooG-qTI4xdARnXPYNwc',
      capabilities: {
        addressAutocompleteControl: true,
        mapDisplayControl: true,
        ctaControl: true
      }
    };

    const componentForm: { [key: string]: string } = {
      street_number: 'City',
      locality: 'long_name',
      country: 'long_name',
      postal_code: 'short_name',
    };

    const getFormInputElement = (component: string) => {
      document.getElementById(component + '-input') as HTMLInputElement;
    };

    const map = new google.maps.Map(this.gmpMap.nativeElement, {
      zoom: CONFIGURATION.mapOptions.zoom,
      center: CONFIGURATION.mapOptions.center,
      mapTypeControl: false,
      fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
      zoomControl: CONFIGURATION.mapOptions.zoomControl,
      streetViewControl: CONFIGURATION.mapOptions.streetViewControl,
    });

    const marker = new google.maps.Marker({ map, draggable: false });
    const autocompleteInput = this.locationInput.nativeElement as HTMLInputElement;

    if (autocompleteInput) {
      const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
        fields: ['address_components', 'geometry', 'name'],
        types: ['address'],
      });

      autocomplete.addListener('place_changed', () => {
        marker.setVisible(false);
        const place = autocomplete.getPlace();
        if (place.geometry) {
          this.renderAddress(place);
          this.fillInAddress(place);
        } else {
          window.alert(`No details available for input: '${place.name}'`);
        }
      });
    }
  }

  fillInAddress(place: google.maps.places.PlaceResult) {
    const addressNameFormat = {
      locality: 'Locality',
      country: 'Country',
      postal_code: 'Postal Code',
    };

    for (const type in addressNameFormat) {
      if (addressNameFormat.hasOwnProperty(type)) {
        const component = addressNameFormat[type as keyof typeof addressNameFormat];
        const value = this.getAddressComponentValue(place.address_components || [], type);
        const inputElement = this.getFormInputElement(type);
        if (inputElement) {
          inputElement.value = value;
        }
      }
    }
  }

  getAddressComponentValue(
    components: google.maps.GeocoderAddressComponent[], 
    type: string
  ): string {
    const addressNameFormat: { [key: string]: string } = {
      street_number: 'City',
      locality: 'Locality',
      country: 'Country',
      postal_code: 'Postal Code',
    };
  
    const component = components.find((c) => c.types.includes(type));
    return component ? addressNameFormat[type] : '';
  }
  

  renderAddress(place: google.maps.places.PlaceResult) {
    const map = new google.maps.Map(this.gmpMap.nativeElement);
    const marker = new google.maps.Marker({
      map,
      position: place.geometry?.location,
    });
  }

  private getFormInputElement(component: string): HTMLInputElement | null {
    return document.getElementById(component + '-input') as HTMLInputElement | null;
  }
  
  ngAfterViewInit() {
    this.initMap();
  }
}