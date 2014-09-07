# global beforeEach, describe, it, assert, expect
"use strict"

describe 'Forecast Model', ->
  beforeEach ->
    @ForecastModel = new Sweather.Models.Forecast();
