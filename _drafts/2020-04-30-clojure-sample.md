---
title: Clojure sample
categories: clojure
---
<!--more-->
## Basic types

```clojure
12.43

;; -> 12.43
1/3

;; -> 1/3
4/2

;; -> 2
4.0/2

;; -> NumberFormatException Invalid number: 4.0/2
(/ 1 3)

;; -> 1/3
(/ 1 3.0)

;; -> 0.3333333333333333


"jam"

;; -> "jam"

:jam

;; -> :jam

\j

;; -> \j

true

;; -> true
false

;; -> false

nil

;; -> nil
(+ 1 1)

;; -> 2


(+ 1(+ 8 3))

;; -> 12

'(1 2 "jam" :marmalade-jar)

;; -> (1 2 "jam" :marmalade-jar)

(first '(:rabbit :pocket-watch :marmalade :door)) 
;; -> :rabbit
(rest '(:rabbit :pocket-watch :marmalade :door)) 
;; -> (:pocket-watch :marmalade :door)

(cons 5 '()) 
;; -> (5)

;; building the list with a nil
(cons 5 nil)

;; -> (5)
(cons 4 (cons 5 nil)) 

;; -> (4 5)


;; Vector
[:jar1 1 2 3 :jar2]

;; -> [:jar1 1 2 3 :jar2]
(first [:jar1 1 2 3 :jar2])

;; -> :jar1
(rest [:jar1 1 2 3 :jar2]) 
;; -> (1 2 3 :jar2)
(nth [:jar1 1 2 3 :jar2] 0) 
;; -> :jar1
(nth [:jar1 1 2 3 :jar2] 2) 
;; -> 2


;; conj adds to the end of vectors
(conj [:toast :butter] :jam) 
;; -> [:toast :butter :jam]
    
;; multiple elements added on end of vectors
(conj [:toast :butter] :jam :honey) 
;; -> [:toast :butter :jam :honey]

 
;; conj adds to the front of lists
(conj '(:toast :butter) :jam) 
;; -> (:jam :toast :butter)
    
;; multiple elements added to the front of lists
(conj '( :toast :butter) :jam :honey) 
;; -> (:honey :jam :toast :butter)

;; MAPS
{:jam1 "strawberry" :jam2 "blackberry"}
;; -> {:jam2 "blackberry", :jam1 "strawberry"}

 ;; explicit get
(get {:jam1 "strawberry" :jam2 "blackberry"} :jam2)
;; -> "blackberry"
(get {:jam1 "strawberry" :jam2 "blackberry"} :jam3 "not found")
;; -> "not found"

 ;; getting using the key as the function
(:jam2 {:jam1 "strawberry" :jam2 "blackberry" :jam3 "marmalade"}) ;; -> "blackberry"
  ;; the keys function
(keys {:jam1 "strawberry" :jam2 "blackberry" :jam3 "marmalade"}) ;; -> (:jam3 :jam2 :jam1)
    ;;the vals function
(vals {:jam1 "strawberry" :jam2 "blackberry" :jam3 "marmalade"}) ;; -> ("marmalade" "blackberry" "strawberry")

(assoc {:jam1 "red" :jam2 "black"} :jam1 "orange")
;; -> {:jam2 "black", :jam1 "orange"}

(dissoc {:jam1 "strawberry" :jam2 "blackberry"} :jam1) ;; -> {:jam2 "blackberry"}

(merge {:jam1 "red" :jam2 "black"}
           {:jam1 "orange" :jam3 "red"}
{:jam4 "blue"})
;; -> {:jam4 "blue", :jam3 "red", :jam2 "black", :jam1 "orange"}

;; SETS

#{:red :blue :white :pink}
;; -> #{:white :red :blue :pink}
;; No duplicates allowed in the set at creation
#{:red :blue :white :pink :pink}
;; -> IllegalArgumentException Duplicate key: :pink

(clojure.set/union #{:r :b :w} #{:w :p :y})
;; -> #{:y :r :w :b :p}
(clojure.set/difference #{:r :b :w} #{:w :p :y})
;; -> #{:r :b}
(clojure.set/intersection #{:r :b :w} #{:w :p :y})
;; -> #{:w}
(set [:rabbit :rabbit :watch :door]) ;; -> #{:door :watch :rabbit}
(set{:a1:b2:c3})
;; -> #{[:c 3] [:b 2] [:a 1]}

(get #{:rabbit :door :watch} :rabbit)
;; -> :rabbit
(get #{:rabbit :door :watch} :jar)
;; -> nil
We can also access it directly using the keyword:
(:rabbit #{:rabbit :door :watch})
;; -> :rabbit

(#{ :rabbit :door :watch} :rabbit)
;; -> :rabbit
(contains? #{:rabbit :door :watch} :rabbit)
;; -> true
(contains? #{:rabbit :door :watch} :jam) ;; -> false
(conj #{:rabbit :door} :jam) 
;; -> #{:door :rabbit :jam}
(disj #{:rabbit :door} :door)
;; -> #{:rabbit}

;; func
(defn shop-for-jams [jam1 jam2] {:name "jam-basket"
:jam1 jam1
:jam2 jam2})
;; -> #'user/shop-for-jams
(shop-for-jams "strawberry" "marmalade")
;; -> {:name "jam-basket", :jam1 "strawberry", :jam2 "marmalade"}

;;  anonymous function
(#(str "Off we go" "!" " - " %) "again")
;; -> "Off we go! - again"
(#(str "Off we go" "!" " - " %1 %2) "again" "?")
;; -> "Off we go! - again?"

```



