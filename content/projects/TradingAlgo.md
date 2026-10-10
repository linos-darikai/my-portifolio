## Overview

An experiment in using fuzzy logic for trading decisions. Instead of hard thresholds, the algorithm treats ideas like "bullish" and "overbought" as degrees of truth and blends them into a single score from 0 (sell) to 100 (buy).

## How it works

1. Pulls five years of daily S&P 500 (`^GSPC`) prices with `yfinance`
2. Computes a 14-day RSI and 5-day / 50-day simple moving averages with the `ta` library
3. Classifies each day's candle as bullish, bearish or neutral
4. Feeds trend and RSI into a `scikit-fuzzy` control system with membership functions and a rule base (for example, neutral trend + oversold RSI → buy)
5. Serves the results from a Flask `/data` endpoint to a Chart.js chart that plots price history alongside the decisions

## Built with

Python, NumPy, scikit-fuzzy, yfinance, ta, Flask and Chart.js.
