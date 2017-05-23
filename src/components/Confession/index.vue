<template>
  <article :class="$style.confession">
    <box>
      <header :class="$style.header">
        <category-list :class="$style.categories" :ids="item.categories" />
        <div :class="$style.social">
          <a target="_blank" rel="nofollow norel" :href="'https://twitter.com/intent/tweet?url=http%3A%2F%2Fnuswhispers.com%2Fconfession%2F' + item.confessionId">
            <icon :class="$style.actionIcon" id="social-twitter" />
          </a>
          <a target="_blank" rel="nofollow noopener" :href="'https://www.facebook.com/dialog/share?app_id=1577825682475577&amp;type=dialog&amp;href=http%3A%2F%2Fnuswhispers.com%2Fconfession%2F' + item.confessionId">
            <icon :class="$style.actionIcon" id="social-facebook" />
          </a>
        </div>
      </header>

      <div :class="$style.content">
        <router-link :to="'/confession/' + item.confessionId">#{{ item.confessionId }}:</router-link>
        <confession-content :class="$style.contentInject" :content="item.content" />
        <img :class="$style.contentImage" v-if="item.images" :src="item.images" :alt="'Confession #' + item.confessionId" />
        <p>
          <a target="_blank" rel="nofollow noopener" :href="fbLink">View on Facebook</a>
        </p>
      </div>

      <footer :class="$style.footer">
        <div :class="$style.timestamp">
          <icon :class="$style.footerIcon" id="time" />
          {{ humanCreatedAt }}
        </div>
        <div :class="$style.actions">
          <a :href="fbLink" :class="$style.action">
            <icon :class="$style.footerIcon" id="message" />
            {{ item.fbCommentCount }}
          </a>
          <a :href="fbLink" :class="$style.action">
            <icon :class="$style.footerIcon" id="thumbs-up" />
            {{ item.fbLikeCount }}
          </a>
          <!--<a href="#" :class="$style.action">
            <icon :class="$style.footerIcon" id="bookmark" />
            0
          </a>-->
        </div>
      </footer>
    </box>
  </article>
</template>

<style module>
.confession {
  margin-bottom: 1rem;
}

.header {
  border-bottom: 1px solid #eee;
  color: #999;
  display: flex;
  padding-bottom: .5rem;
  margin-bottom: 1rem;
}

.categories {
  flex: 2;
}

.social {
  text-align: right;
}

.icon {
  fill: #999;
  height: 24px;
  transition: fill .25s;
  width: 24px;
  vertical-align: middle;
}

.actionIcon {
  composes: icon;
  margin-left: .5rem;
}

.actionIcon:hover {
  fill: #333;
}

.content {
  line-height: 1.5rem;
}

.contentInject {
  display: inline;
  white-space: pre-wrap;
  word-break: break-word;
}

.contentImage {
  height: auto;
  max-width: 100%;
  padding-top: 1rem;
}

.link {
  text-align: right;
}

.footer {
  border-top: 1px solid #eee;
  color: #999;
  display: flex;
  padding-top: .5rem;
  margin-top: 1rem;
}

.timestamp {
  margin-left: -5px;
}

.footerIcon {
  composes: icon;
  fill: #ccc;
  vertical-align: -25%;
}

.actions {
  flex: 2;
  text-align: right;
}

.action {
  color: #999;
  fill: #999;
  margin-left: .5rem;
  text-decoration: none;
}

.action:hover {
  color: #333;
  fill: #333;
  text-decoration: none;
}
</style>

<script lang="ts" src="./index.ts" />
