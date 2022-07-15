package ch.zli.m223.punchclock.util;

import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.inject.Singleton;
import javax.transaction.Transactional;

import ch.zli.m223.punchclock.domain.Category;
import ch.zli.m223.punchclock.domain.Location;
import ch.zli.m223.punchclock.service.CategoryService;
import ch.zli.m223.punchclock.service.LocationService;
import io.quarkus.runtime.StartupEvent;

/*
 * Autor: Leon Lopetrone
 * Version 1.0
 * Date: 15.07.2022
 * 
 * Class which is responible for setting up the Dropdown values
 * 
 */
@Singleton
public class StartUp {
    @Inject
    public CategoryService categoryService;
    
    @Inject
    public LocationService locationService;

    @Transactional
    public void loadData(@Observes StartupEvent evt) {
        Category it = new Category();
        it.setTitle("IT");
        categoryService.createCategory(it);

        Category hr = new Category();
        hr.setTitle("HR");
        categoryService.createCategory(hr);

        Category sale = new Category();
        sale.setTitle("Sale department");
        categoryService.createCategory(sale);

        Category ad = new Category();
        ad.setTitle("Advertisement");
        categoryService.createCategory(ad);

        Category stock = new Category();
        stock.setTitle("Stock department");
        categoryService.createCategory(stock);
        
        Location zuerich = new Location();
        zuerich.setTitle("Zürich");
        locationService.createLocation(zuerich);

        Location bern = new Location();
        bern.setTitle("Bern");
        locationService.createLocation(bern);

        Location basel = new Location();
        basel.setTitle("Basel");
        locationService.createLocation(basel);

        Location winterthur = new Location();
        winterthur.setTitle("Winterthur");
        locationService.createLocation(winterthur);

        Location other = new Location();
        other.setTitle("Other");
        locationService.createLocation(other);
    }

    

}